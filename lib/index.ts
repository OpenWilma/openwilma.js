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
			if(validateServer){
				let result = servers.find(({url, formerUrl}) => url === account.server || formerUrl == account.server);
				if(result !== undefined) {
					// Warn about the possible usage of an old url
					if(result.formerUrl === account.server){
						warn("Supplied an old URL for a Wilma Server. Please use \"" + result.url + "\" in the future to access the \"" + result.name + "\" Wilma server.", "UsedFormerURL")
					}
					// Server is now valid
					await this.loginRoutine(account, versionCheck);
				} else {
					throw new Errors.WAPIError("No such Wilma server available as: \"" + account.server + "\". If you are trying to connect to an unofficial Wilma server, disable server validation (more information in the OpenWilma documentation).")
				}
			} else {
				 return await this.loginRoutine(account, versionCheck);
			}
		}
		catch(err){
			throw new Error(err)
		}
	}

	private async loginRoutine(account: WilmaAccountConfiguration, versionCheck: boolean) {
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
				// Perform login steps
				const req = await apiRequest.post({
					url: account.server+"/index_json",
					body: {
						Login: account.username,
						Password: account.password,
						SESSIONID: WilmaServer.data.SessionID,
						CompleteJson: '',
						format: 'json'
					},
					headers: [
						{name: "Content-Type", value: "application/x-www-form-urlencoded"},
						{name: "User-Agent", value: "OpenWilma/0.0.1"}
						//{name: "Cookie", value: "Wilma2LoginID=" + WilmaServer.data.SessionID + ";"}
					],
					redirect: false,
					statusCheck: (num) => {return num == 303;}
				})
				if(req.status == 303){
					if (req.headers['set-cookie']) {
						let sessionValue = null;
						for (let cookie of req.headers['set-cookie']) {
							if (cookie.includes("Wilma2SID")) {
								//Wilma COOKIE
								let sessionId = /^(.*)Wilma2SID=([^;]+)(.*)$/.exec(cookie);
								if (sessionId !== null) {
									sessionValue = sessionId[2];
								}
							}
						}
						if (!sessionValue) {
							throw new Errors.WilmaAuthError("Sign in failed, invalid username or password?")
						}
						console.log(sessionValue);
					}
					// Check login result
					//console.log(req)
				} else {
					throw new Errors.WAPIServerError(req.data.error)
				}
			}else {
				throw new Errors.WAPIServerError(WilmaServer.data.error)
			}
		}
		catch(err){
			throw new Errors.APIRequestError(err)
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