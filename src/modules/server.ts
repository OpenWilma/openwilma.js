import fetch from "cross-fetch";
import { supportedVersions } from "../supportedVersions";
import type { APIResponses } from "../types/APIResponses";

export async function listServers() {
    const serverListRequest = await fetch("https://wilmahub.service.inschool.fi/wilmat");

    if (serverListRequest.status === 200) {
        const servers: APIResponses.WilmaList = await serverListRequest.json();

        return servers.wilmat.map((server) => ({
            name: server.name,
            url: server.url,
            formerUrl: server.formerUrl,
        }));
    }

    throw new Error("Failed to request list of Wilma servers");
}

export async function validateServer(url: string) {
    // Verify server url
    const servers = await listServers();
    const urlIsValid = servers.some((server) => server.url.includes(url));

    // Verify API version
    if (urlIsValid) {
        const serverInfoRequest = await fetch(`${url}/index_json`);

        if (serverInfoRequest.status === 200) {
            const info: APIResponses.LoginFailed = await serverInfoRequest.json();

            return supportedVersions.includes(info.ApiVersion);
        }

        throw new Error("Failed to connect to server");
    }

    return false;
}
