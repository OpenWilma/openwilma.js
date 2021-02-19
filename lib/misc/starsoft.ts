import { request } from "../net/request"
import {WilmaServer} from "../types"

const listServers = async (): Promise<Array<WilmaServer>> => {
    const servers = await request("get", null, {
        url: "https://www.starsoft.fi/wilmat/wilmat.json"
    })

    console.log(servers)

    return servers
}

export default listServers
