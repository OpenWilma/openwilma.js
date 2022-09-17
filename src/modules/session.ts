import { request } from "../utils/request";
import { validateServer } from "./server";

export async function create(options: SessionOptions): Promise<WilmaSession> {
    if (!options.flags) options.flags = []

    // Validate server
    if (options.validateServer !== false && !await validateServer(options.url)) throw new Error("Unknown or unsupported Wilma server url")

    // Get session id
    const sessionInitRequest = await request("GET", `${options.url}/index_json`, { json: true })
    if (sessionInitRequest.status !== 200) throw new Error("Unable to get session id")
    const sessionInit: any = sessionInitRequest.data
    const loginSessionId = sessionInit.SessionID

    // Login
    const loginParams = new URLSearchParams({
        Login: options.username,
        Password: options.password,
        SESSIONID: loginSessionId,
        CompleteJson: "",
        format: "json"
    })
    const sessionLoginRequest = await request("POST", `${options.url}/index_json`, {
        body: loginParams.toString(),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    if (sessionLoginRequest.headers.location.includes("loginfailed")) throw new Error("Failed to login. Check your account credentials and server url")
    const sessionLoginRequestCookies: any = sessionLoginRequest.headers["set-cookie"]
    let sessionId: string
    try {
        sessionId = sessionLoginRequestCookies.filter((cookie: string) => cookie.startsWith("Wilma2SID="))[0].split("=")[1].split(";")[0]
    } catch (_) {
        throw new Error("Failed to parse session cookies")
    }

    // Fetch user details
    const accountInfoRequest = await request("GET", `${options.url}/api/v1/accounts/me`, {
        headers: {
            "Cookie": `Wilma2SID=${sessionId}`
        },
        stringify: true
    })
    const accountRolesRequest = await request("GET", `${options.url}/api/v1/accounts/me/roles`, {
        headers: {
            "Cookie": `Wilma2SID=${sessionId}`
        },
        stringify: true
    })

    const account = {
        id: null,
        firstname: null,
        lastname: null,
        username: options.username,
        lastLogin: 0
    }
    let roles = []
    let slug = ""

    // Handle roles
    if (accountRolesRequest.status !== 200) throw new Error("Unable to fetch essential account role information")
    try {
        const accountRoleData = JSON.parse(accountRolesRequest.data.toString()).payload // .toString is useless, but compiler wants it, what a piece of crap...
        roles = accountRoleData
            .filter((role: any) => role.type !== "passwd") // Note: Unsure if these are needed
            .map((role: any, index: number) => ({
                name: role.name,
                type: role.type,
                isDefault: index === 0,
                id: role.primusId,
                slug: role.slug.replace(/\\/g, ""),
                formkey: role.formKey,
                secret: null
            }))
        slug = roles[0].slug
    } catch(_) {
        throw new Error("Failed to parse account role data")
    }

    // Handle general info
    if (accountInfoRequest.status === 403) {
        // We are dealing with an old account type, first role is default
        account.firstname = roles[0].name.trim().split(" ")[0]
        account.lastname = roles[0].name.trim().split(" ")[1]
        account.id = roles[0].id
        // Note: slug already set
    } else if (accountInfoRequest.status === 200) {
        const accountInfo = JSON.parse(accountInfoRequest.data.toString()).payload // .toString is useless, but compiler wants it, what a piece of crap...
        
        // Check if MFA is enabled
        if (accountInfo.multiFactorAuthentication) {
            throw new Error("Multi-factor authentication is not yet supported")
        }

        account.firstname = accountInfo.firstname
        account.lastname = accountInfo.lastname
        account.lastLogin = Date.parse(accountInfo.lastLogin)
        account.id = account.id
    } else throw new Error("Unable to get essential account information")

    // Acquire messaging secrets for all roles
    // TODO: Could this be a permissions issue? As in: are messages always available
    // @ts-ignore <- TODO: THIS IS A CRIME! FIX THIS!
    if (!options.flags.includes("disable-fetch-secret")) {
        for (const role of roles) {
            const secretRequest = await request("GET", `${options.url}${role.slug}/messages`,{
                headers: {
                    "Cookie": `Wilma2SID=${sessionId}`
                },
                stringify: true
            })
            if (secretRequest.status !== 200) throw new Error("Unable to fetch the secret for a role")
            role.secret = secretRequest.data.toString().split('name="secret" value="')[1].split('"')[0]
        }

    } else console.warn(`OpenWilma_js: Experimental flag "disable-fetch-secret" is set. Messaging functionality is disabled!`)

    return {
        account: {
            id: account.id,
            firstname: account.firstname,
            lastname: account.lastname,
            username: account.username,
            lastLogin: account.lastLogin !== 0 ? new Date(account.lastLogin) : null
        },
        roles,
        session: {
            id: sessionId,
            url: options.url,
            slug: slug
        },
        flags: options.flags
    }
}