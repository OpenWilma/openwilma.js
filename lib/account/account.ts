import apiRequest from "../net/apiRequest"
import Errors from "../util/error"

import WilmaUser from "./user"
import { ListedWilmaUserInfo } from "../types/userInfo"

/** A factory class for getting the users of an account. */
class WilmaAccount {

    users?: Array<ListedWilmaUserInfo>

    server: string

    sessionValue: string

    constructor(server: string, sessionValue: string, 
        users?: Array<ListedWilmaUserInfo>) {
        this.server = server

        this.sessionValue = sessionValue

        this.users = users

        console.log(users)
    }

    async getUser(): Promise<WilmaUser> {
        let url = this.server

        const firstUser = this.users?.[0]

        if (firstUser) {
            url += `/!${firstUser.slug}`
        }

        url += "/messages"

        const { status, data } = await apiRequest.get({
            url,
            headers: [{
                name: "Cookie", 
                value: `Wilma2SID=${this.sessionValue}`
            }]
        })

        if (status !== 200) {
            throw new Errors.WAPIAuthError(
                `Could not fetch credentials: status code ${status}.`
            )
        }

        const [secret] = data
            .split("name=\"secret\" value=\"")[1]?.split("\"")

        const [formkey] = data
            .split("name=\"formkey\" value=\"")[1]?.split("\"")

        if (!secret || !formkey) {
            throw new Errors.WAPIParserError(
                "Failed to fetch secondary credentials."
            )
        }

        return new WilmaUser({
            id: this.sessionValue,
            formkey,
            secret,
            slug: firstUser?.slug,
            server: this.server
        })
    }
}

export default WilmaAccount