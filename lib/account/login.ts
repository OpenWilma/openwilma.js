import apiRequest from "../net/apiRequest"
import Errors from "../util/error"
import WilmaAccount from "./account"

import { WilmaAccountConfiguration } from "../types"
import { RequestResponse } from "../types/apiRequest"
import { ListedWilmaUserInfo } from "../types/userInfo"

const supportedApiVersions = [11, 12, 13]

const login = async (
    account: WilmaAccountConfiguration
): Promise<WilmaAccount> => {

    // TODO: Validate that the given server is in the wanted format.
    // Strip '/' from the end if it is present.

    const server: RequestResponse = await apiRequest.get({
        url: `${account.server}/index_json`
    })

    if (server.status !== 200) {
        throw new Errors.WAPIError(
            `Wilma server responded with ${server.status}.`
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
        url: `${account.server}/messages`,
        headers: [
            {name: "Cookie", value: "Wilma2SID=" + sessionValue}
        ]
    })

    switch (credentialResponse.status) {
    // The server does not use slugs
    case 200:
        return new WilmaAccount(account.server, sessionValue, undefined)
    // The server probably uses slugs
    case 403: {
        const indexResponse = await apiRequest.get({
            url: `${account.server}/`,
            headers: [
                {name: "Cookie", value: "Wilma2SID=" + sessionValue}
            ]
        })

        if (indexResponse.status !== 200) {
            throw new Errors.WAPIAuthError(
                "Could not fetch users for this account."
            )
        }

        const [, panelBody] = indexResponse.data
            .split("<div class=\"panel-body\">")

        const userRegex = 
            /<h1><a class="text-style-link" href="\/!(.*)\/">(.*)<\/a><\/h1>/gm
        
        const users = panelBody.match(userRegex)
            .map((m: string): ListedWilmaUserInfo => {
                const regexMatch = userRegex.exec(m)

                if (!regexMatch) {
                    throw new Errors.WAPIAuthError(
                        "Could not fetch users for this account."
                    )
                }

                const slug = regexMatch[1]
                if (!slug) {
                    throw new Errors.WAPIAuthError(
                        "Could not fetch a slug for an user of this account."
                    )
                }

                let name = regexMatch[2]
                let school
                
                if (name?.includes("<small>")) {
                    const [splitName, splitSchool] = name.split("<small>")

                    name = splitName.trimEnd()
                    school = splitSchool.split("<small>")[0].slice(0, -8)
                }

                return {
                    name,
                    school,
                    slug,
                }
            })
        
        
        return new WilmaAccount(account.server, sessionValue, users)
    } 
    // Unknown error
    default:
        throw new Errors.WAPIAuthError(
            `Wilma server responded with ${credentialResponse.status}`
        )
    }
/*
    if (credentialResponse.status !== 200) {
        console.log(credentialResponse.status)
        throw new Errors.WAPIAuthError("Failed to fetch secondary credentials.")
    }

    //const [, panelBody] = credentialResponse.data
    //    .split("<div class=\"panel-body\">")

    // eslint-disable-next-line max-len
    //const userMatches = panelBody.match(/<h1><a class="text-style-link" href="\/!(.*)\/">(.*)<\/a><\/h1>/gm)

    //userMatches.map()

    // TODO: Inline null checks for the secret and the formkey

    const secret: string = credentialResponse.data
        .split("name=\"secret\" value=\"")[1]?.split("\"")[0]
    const formkey: string = credentialResponse.data
        .split("name=\"formkey\" value=\"")[1]?.split("\"")[0]

    if (!secret || !formkey) {
        throw new Errors.WAPIParserError(
            "Failed to fetch secondary credentials."
        )
    }

    // TODO: Something like an account factory class. 
    // Return a class such as Wilma?
    // There can be multiple accounts per a user.

    return new WilmaAccount([])*/
}

export default login