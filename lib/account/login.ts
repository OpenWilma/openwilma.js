import WilmaAccount from "./account"
import { serverList } from "../misc/starsoft"
import {WilmaServer} from "../types"

export interface WilmaLoginOptions {
    username: string,
    password: string,
    // It can also be a WilmaServer
    server: string | WilmaServer,
    validateServer?: boolean
}

const login = (
    url: string, 
    options: WilmaLoginOptions
): void => {/*
    // Validate server
    const servers: WilmaServer[] = await serverList()
    if(validateServer !== false){
        let valid: boolean = false
        for(let i = 0; i < servers.length; i++){
            let server: WilmaServer = servers[i]
            if(server.url == account.server){
                // TODO: Warn the user for using formerUrl
                    account.server = server.url
                    valid = true
                    break
            }else if(server.formerUrl == account.server)){
                warn("Supplied an old URL for a Wilma Server. Please use \"" + server.url + "\" in the future to acces the \"" + server.name + "\" Wilma server.", "UsedFormerURL")
                account.server = server.url
                valid = true
            }
        }
        if(valid === false){
            throw new WAPIError("No such Wilma server available as: \"" + account.server + "\". If you are trying to connect to an unofficial Wilma server, disable server validation (more information in the OpenWilma documentation).")
        }
    }
    // From this point on the server has been proved as valid
    // Check the server API version
    try {
        let WilmaServer: RequestResponse = await apiRequest.get({
            url: account.server + "/index_json"
        })
        if(WilmaServer.status == 200){
            console.log(WilmaServer.data)
        }else {
            throw new WAPIServerError(WilmaServer.data.error)
        }
    } catch(err){
                            throw new APIRequestError(err)
			}
		}
	}*/
}

export default login
