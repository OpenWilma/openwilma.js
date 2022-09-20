import type { APIResponses } from "../types/APIResponses";
import { fetch } from "./fetch";
import { Session } from "./Session";

export class OpenWilma {
    public static supportedVersions = [18, 19, 20];

    private constructor(private url: string) {}

    public async login(options: Session.Options): Promise<Session> {
        if (!options.flags) options.flags = [];

        // Get session id
        const sessionInitRequest = await fetch(`${this.url}/index_json`);

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

        const sessionLoginRequest = await fetch(`${this.url}/index_json`, {
            method: "POST",
            body: loginParams.toString(),
            // TODO: this breaks browser build (though browser builds are broken due to CORS anyway)
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
            [sessionId] = sessionLoginRequestCookies
                .split(", ")
                .filter((cookie) => cookie.startsWith("Wilma2SID="))[0]
                .split("=")[1]
                .split(";");
        } catch (_) {
            throw new Error("Failed to parse session cookies");
        }

        // Fetch user details
        const accountInfoRequest = await fetch(`${this.url}/api/v1/accounts/me`, {
            headers: {
                Cookie: `Wilma2SID=${sessionId}`,
            },
        });

        const accountRolesRequest = await fetch(`${this.url}/api/v1/accounts/me/roles`, {
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
                // TODO: implement MFA
                throw new Error("Multi-factor authentication is not yet supported");
            }

            account.firstname = accountInfo.firstname;
            account.lastname = accountInfo.lastname;
            account.lastLogin = Date.parse(accountInfo.lastLogin);
            account.id = accountInfo.id;
        } else throw new Error("Unable to get essential account information");

        return new Session({
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
                url: this.url,
                slug,
            },
            flags: options.flags,
        });
    }

    public static async connect(url: string, validateServer = true) {
        if (validateServer) {
            const check = await OpenWilma.validateServer(url);

            if (!check.valid) throw new Error(`Invalid server: ${check.reason}`);
        }

        return new OpenWilma(url);
    }

    public static async listServers() {
        const serverListRequest = await fetch("https://wilmahub.service.inschool.fi/wilmat");

        if (serverListRequest.status !== 200) throw new Error("Failed to request list of Wilma servers");

        const servers: APIResponses.WilmaList = await serverListRequest.json();

        return servers.wilmat.map((server) => ({
            name: server.name,
            url: server.url,
            formerUrl: server.formerUrl,
        }));
    }

    public static async validateServer(url: string): Promise<{ valid: true } | { valid: false; reason: string }> {
        const parsed = ((u) => {
            try {
                return new URL(u).origin;
            } catch {
                return null;
            }
        })(url);

        if (!parsed) {
            return {
                valid: false,
                reason: "Invalid url",
            };
        }

        const servers = await OpenWilma.listServers();
        const serverFound = servers.some((server) => server.url === url);

        if (!serverFound) {
            return {
                valid: false,
                reason: "Not in list of official servers",
            };
        }

        const serverInfoRequest = await fetch(`${url}/index_json`);

        if (serverInfoRequest.status !== 200) {
            return {
                valid: false,
                reason: "Failed to connect to server",
            };
        }

        const info: APIResponses.LoginFailed = await serverInfoRequest.json();

        if (!OpenWilma.supportedVersions.includes(info.ApiVersion)) {
            return {
                valid: false,
                reason: "Unsupported version",
            };
        }

        return { valid: true };
    }
}
