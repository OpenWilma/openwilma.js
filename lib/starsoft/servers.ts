import request from "../net/request"
export async function listServers(){
    try {
        let servers = await request.get({
            url: "https://www.starsoft.fi/wilmat/wilmat.json"
        });
        console.log(servers)
    }
    catch(err){
        throw err;
    }
}