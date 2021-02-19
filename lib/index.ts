/**
 *
 * This is the Javascript version of the OpenWilma project.
 *
 * Author: OpenWilma.Js contributors (see github repository contributors list).
 *
 * Website: https://openwilma.testausserveri.fi
 *
 * Github: https://github.com/OpenWilma/openwilma_js/
 */
import WilmaAccountConfiguration from "./types";
import  {WilmaSession} from "./types/WilmaSession"
import Errors from "./utils/error"
import {listServers} from "./starsoft/servers"
import {WilmaServer} from "./types/starsoft";
import warn from "./utils/warn"
import apiRequest from "./net/apiRequest";
import { RequestResponse } from "./types/apiRequest";

class OpenWilmaCore {
	
	/**
	 * Login to a new Wilma account
	 * @param {WilmaAccountConfiguration} account The Wilma account configuration.
	 * @param {boolean} validateServer Validate the provider Wilma server
	 */
	async login(account: WilmaAccountConfiguration, validateServer: boolean) : Promise<WilmaAccountInstance> {
		try {
			// Validate server
			let servers: WilmaServer[] = await listServers()
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
					// Server is not valid
					throw new Errors.WAPIError("No such Wilma server available as: \"" + account.server + "\". If you are trying to connect to an unofficial Wilma server, disable server validation (more information in the OpenWilma documentation).")
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
					throw new Errors.WAPIServerError(WilmaServer.data.error)
				}
			}
			catch(err){
				throw new Errors.APIRequestError(err)
			}
		}
		catch(err){
			throw new Errors.UnexpectedCatch(err)
		}
	}

}

class WilmaAccountInstance {
	session: WilmaSession
	constructor(session_id: string, secret: string, formkey: string, slug: string){
		this.session = {
			id: session_id,
			formkey: formkey,
			secret: secret,
			slug: slug
		}
	}
}

module.exports = {
	client: OpenWilmaCore,
	listServers: listServers
}