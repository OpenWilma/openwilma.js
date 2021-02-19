import request from "../net/request"
import { WilmaServer } from "../types"

const listServers = async (): Promise<WilmaServer> => {
    let servers = await request.get({
        url: "https://www.starsoft.fi/wilmat/wilmat.json"
    });
    console.log(servers)
}

export default listServers
