import fetch from "cross-fetch";
import { validateServer } from "./server";
import type { Session } from "../types/Session";
import type { APIResponses } from "../types/APIResponses";

export async function create(options: Session.Options): Promise<Session> {
    if (!options.flags) options.flags = [];
    // Validate server
    if (options.validateServer !== false && !(await validateServer(options.url))) throw new Error("Unknown or unsupported Wilma server url");

    // Get session id
    const sessionInitRequest = await fetch(`${options.url}/index_json`);

    if (sessionInitRequest.status !== 200) throw new Error("Unable to get session id");

    const sessionInit: APIResponses.LoginFailed = await sessionInitRequest.json();
    const loginSessionId = sessionInit.SessionID;
    // Login
    const loginParams = new URLSearchParams({
        Login: options.username,
        Password: options.password,
        SESSIONID: loginSessionId,
        CompleteJson: "",
        format: "json",
    });

    const sessionLoginRequest = await fetch(`${options.url}/index_json`, {
        method: "POST",
        body: loginParams.toString(),
        redirect: "manual",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    if ((sessionLoginRequest.headers.get("Location") ?? "loginfailed").includes("loginfailed")) {
        throw new Error("Failed to login. Check your account credentials and server url");
    }

    const sessionLoginRequestCookies = sessionLoginRequest.headers.get("Set-Cookie");

    if (!sessionLoginRequestCookies) throw new Error("No cookies found");

    let sessionId: string;

    try {
        console.log(sessionLoginRequestCookies);
        [sessionId] = sessionLoginRequestCookies
            .split(", ")
            .filter((cookie) => cookie.startsWith("Wilma2SID="))[0]
            .split("=")[1]
            .split(";");
    } catch (_) {
        throw new Error("Failed to parse session cookies");
    }

    // Fetch user details
    const accountInfoRequest = await fetch(`${options.url}/api/v1/accounts/me`, {
        headers: {
            Cookie: `Wilma2SID=${sessionId}`,
        },
    });

    const accountRolesRequest = await fetch(`${options.url}/api/v1/accounts/me/roles`, {
        headers: {
            Cookie: `Wilma2SID=${sessionId}`,
        },
    });

    const account: {
        id: number;
        firstname: string;
        lastname: string;
        username: string;
        lastLogin: number;
    } = {
        id: null!,
        firstname: null!,
        lastname: null!,
        username: options.username,
        lastLogin: 0,
    };

    let roles: Session.Role[] = [];
    let slug = "";

    // Handle roles
    if (accountRolesRequest.status !== 200) throw new Error("Unable to fetch essential account role information");
    try {
        const accountRoleData = (await accountRolesRequest.json()).payload as APIResponses.AccountRole[];

        roles = accountRoleData
            .filter((role) => role.type !== "passwd") // Note: Unsure if these are needed
            .map((role, index) => ({
                name: role.name,
                type: role.type as APIResponses.RoleType,
                isDefault: index === 0,
                id: role.primusId,
                slug: role.slug.replace(/\\/g, ""),
                formkey: role.formKey,
            }));

        slug = roles[0].slug;
    } catch (_) {
        throw new Error("Failed to parse account role data");
    }

    // Handle general info
    if (accountInfoRequest.status === 403) {
        // We are dealing with an old account type, first role is default
        [account.firstname, account.lastname] = roles[0].name.trim().split(" ");
        account.id = roles[0].id;
        // Note: slug already set
    } else if (accountInfoRequest.status === 200) {
        const accountInfo = (await accountInfoRequest.json()).payload as APIResponses.AccountInfo;

        // Check if MFA is enabled
        if (accountInfo.multiFactorAuthentication) {
            throw new Error("Multi-factor authentication is not yet supported");
        }

        account.firstname = accountInfo.firstname;
        account.lastname = accountInfo.lastname;
        account.lastLogin = Date.parse(accountInfo.lastLogin);
        account.id = accountInfo.id;
    } else throw new Error("Unable to get essential account information");

    return {
        account: {
            id: account.id,
            firstname: account.firstname,
            lastname: account.lastname,
            username: account.username,
            lastLogin: account.lastLogin === 0 ? null : new Date(account.lastLogin),
        },
        roles,
        session: {
            id: sessionId,
            url: options.url,
            slug,
        },
        flags: options.flags,
    };
}
