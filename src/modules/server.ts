import { request } from "../utils/request";
import supportedVersions from "../supportedVersions.json"

export async function listServers() {
    const serverListRequest = await request("GET", "https://wilmahub.service.inschool.fi/wilmat", { json: true })
    if (serverListRequest.status === 200) {
        const servers: any = serverListRequest.data
        return servers.wilmat.map((server: any) => ({
            name: server.name,
            url: server.url,
            formerUrl: server.formerUrl
        }))
    } else throw new Error("Failed to request list of Wilma servers")
}

export async function validateServer(url: string) {
    // Verify server url
    const servers = await listServers()
    const urlIsValid = servers.filter((server: any) => server.url.includes(url)).length !== 0

    // Verify API version
    if (urlIsValid) {
        const serverInfoRequest = await request("GET", `${url}/index_json`, { json: true })
        if (serverInfoRequest.status === 200) {
            const info: any = serverInfoRequest.data
            return supportedVersions.includes(info.ApiVersion)
        } else throw new Error("Failed to connect to server")
    }

    return false
}