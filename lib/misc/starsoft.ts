import { request } from "../net/request"

export const listServers = async () => {
    const servers = await request("get", null, {
      url: "https://www.starsoft.fi/wilmat/wilmat.json"
    })

    console.log(servers)
}
