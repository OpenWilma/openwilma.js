module.exports = async function listServers(){
    let request = require("./net/request.ts")
    try {
        let servers = await request("get", null, {
            url: "https://www.starsoft.fi/wilmat/wilmat.json"
        })
        console.log(servers)
    }
    catch(err){
        throw err;
    }
}