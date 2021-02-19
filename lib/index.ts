const supportedVersions = [11] // The supported Wilma API versions
import WilmaAccountConfiguration from "./types";
import  {WilmaSession} from "./types/WilmaSession"
import Errors from "./utils/error"
import {listServers} from "./starsoft/servers"
import {WilmaServer} from "./types/starsoft";
import warn from "./utils/warn"
import apiRequest from "./net/apiRequest";
import { RequestResponse } from "./types/apiRequest";
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
class OpenWilmaCore {
	
	/**
	 * Login to a new Wilma account
	 * @param {WilmaAccountConfiguration} account The Wilma account configuration.
	 * @param {boolean} validateServer Validate the provider Wilma server.
	 * 
	 */
	async login(account: WilmaAccountConfiguration, validateServer: boolean, versionCheck: boolean) : Promise<void | WilmaAccountInstance> {
		try {
			// Validate server
			let servers: WilmaServer[] = await listServers()
			if(validateServer !== false){
				let result = servers.find(({url, formerUrl}) => url === account.server || formerUrl == account.server)
				if(result !== undefined){
					// Warn about the possible usage of an old url
					if(result.formerUrl === account.server){
						warn("Supplied an old URL for a Wilma Server. Please use \"" + result.url + "\" in the future to access the \"" + result.name + "\" Wilma server.", "UsedFormerURL")
					}
					// Server is now valid
					// Check the server API version
					try {
						const WilmaServer: RequestResponse = await apiRequest.get({
							url: account.server + "/index_json"
						})
						if(WilmaServer.status == 200){
							// Check API version
							if(!supportedVersions.includes(WilmaServer.data.ApiVersion)){
								if(versionCheck !== true){
									throw new Errors.WAPIError("Unsupported Wilma server. You can disable this check by setting versionCheck to false (more information in the OpenWilma documentation).")
								}else {
									warn("Version check disabled.", "Version support")
								}
							}
							console.log(WilmaServer)
							// Perform login steps
							const req = await apiRequest.post({
								url: account.server + "/login",
								body: {
									Login: account.username,
									Password: account.password,
									SESSIONID: WilmaServer.data.SessionID
								},
								headers: [
									{name: "Content-Type", value: "application/x-www-form-urlencoded"}
								],
								redirect: false
							})
							if(req.status == 200){
								// Session ID is now active
								// Get the secret and formkey
								console.log(req)
							}else {
								throw new Errors.WAPIServerError(req.data.error)
							}
						}else {
							throw new Errors.WAPIServerError(WilmaServer.data.error)
						}
					}
					catch(err){
						throw new Errors.APIRequestError(err)
					}
				}else {
					throw new Errors.WAPIError("No such Wilma server available as: \"" + account.server + "\". If you are trying to connect to an unofficial Wilma server, disable server validation (more information in the OpenWilma documentation).")
				}
			}
		}
		catch(err){
			throw new Error(err)
		}
	}

}

class WilmaAccountInstance {
	session: WilmaSession
	constructor(session_id: string, secret: string, formkey: string, slug: string, server: string){
		this.session = {
			id: session_id,
			formkey: formkey,
			secret: secret,
			slug: slug,
			server: server
		}
	}
}

module.exports = {
	client: OpenWilmaCore,
	listServers: listServers
}