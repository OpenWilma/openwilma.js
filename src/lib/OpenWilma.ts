import type { APIResponses } from "../types/APIResponses";
import type { Session } from "./Session";
import { fetch } from "./fetch";
import { login } from "./Login";

export class OpenWilma {
    public static supportedVersions = [18, 19, 20];

    private constructor(private url: string) {}

    public async login(options: Session.Options): Promise<Session> {
        // Note: This is a bit of a hack
        return login(options, this.url);
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
