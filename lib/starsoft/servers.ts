import request from "../net/apiRequest"
import {RequestResponse} from "../types/apiRequest"
import {WilmaServer} from "../types/starsoft"
import Errors from "../utils/error"

export async function listServers(): Promise<WilmaServer[]> {
    try {
        let servers: RequestResponse = await request.get({
            url: "https://www.starsoft.fi/wilmat/wilmat.json"
        });
        if (servers.status == 200) {
            let list: WilmaServer[] = servers.data.wilmat
            return list
        } else {
            throw new Errors.SAPIError("Unexpected server response from Starsoft server list.")
        }
    } catch (err) {
        throw new Error(err);
    }
}