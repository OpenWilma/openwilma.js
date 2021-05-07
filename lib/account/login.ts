import apiRequest from "../net/apiRequest"
import Errors from "../util/error"
import WilmaAccount from "./account"

import { WilmaAccountConfiguration } from "../types"
import { RequestResponse } from "../types/apiRequest"

const supportedApiVersions = [11]

const login = async (
    account: WilmaAccountConfiguration
): Promise<WilmaAccount> => {

    // TODO: Validate that the given server is in the wanted format.

    const server: RequestResponse = await apiRequest.get({
        url: `${account.server}/index_json`
    })

    if (server.status !== 200) {
        throw new Errors.WAPIError(
            `Wilma server did not responded with ${server.status}.`
        )
    }

    const { 
        ApiVersion: apiVersion,
        SessionID: sessionID
    } = server.data

    if (!supportedApiVersions.includes(apiVersion)) {
        throw new Errors.WAPIError(
            `Unsupported Wilma server version ${apiVersion}.`
        )
    }

    const loginResponse = await apiRequest.post({
        url: `${account.server}/index_json`,
        body: {
            Login: account.username,
            Password: account.password,
            SESSIONID: sessionID,
            CompleteJson: "",
            format: "json"
        },
        headers: [{
            name: "Content-Type", 
            value: "application/x-www-form-urlencoded"
        }],
        redirect: false
    })

    if (loginResponse.status !== 303) {
        throw new Errors.WAPIServerError(loginResponse.data.error)
    }

    const cookieHeader = loginResponse.headers["set-cookie"]
    let sessionValue

    if (cookieHeader) {
        const sessionIdCookie = cookieHeader
            .find((h: string | string[]) => h.includes("Wilma2SID"))

        sessionValue = /^(.*)Wilma2SID=([^;]+)(.*)$/.exec(sessionIdCookie)
        if (sessionValue !== null) sessionValue = sessionValue[2]
    } else {
        throw new Errors.WAPIAuthError(
            "SessionID cookie expected in response body."
        )
    }

    if (!sessionValue) {
        throw new Errors.WAPIAuthError(
            "Sign in failed, invalid username or password?"
        )
    }

    const credentialResponse = await apiRequest.get({
        url: account.server + "/messages",
        headers: [
            {name: "Cookie", value: "Wilma2SID=" + sessionValue}
        ]
    })

    if (credentialResponse.status !== 200) {
        throw new Errors.WAPIAuthError("Failed to fetch secondary credentials.")
    }

    // TODO: Inline null checks for the secret and the formkey

    const secret: string = credentialResponse.data
        .split("name=\"secret\" value=\"")[1].split("\"")[0]
    const formkey: string = credentialResponse.data
        .split("name=\"formkey\" value=\"")[1].split("\"")[0]

    if (!secret || !formkey) {
        throw new Errors.WAPIParserError(
            "Could not parse a secret or a formkey from a credential response."
        )
    }

    // TODO: Something like an account factory class. 
    // Return a class such as Wilma?
    // There can be multiple accounts per a user.

    return new WilmaAccount({
        id: sessionValue,
        secret: secret,
        formkey: formkey,
        server: account.server,
        slug: null
    })
}

export default login