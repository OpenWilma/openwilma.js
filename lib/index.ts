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
import WilmaAccountConfiguration from "./index"
class OpenWilmaCore {
	
	/**
	 * Login to a new Wilma account
	 * @param {WilmaAccountConfiguration} account The Wilma account configuration.
	 */
	async login(account: WilmaAccountConfiguration) : Promise<WilmaAccountInstance> {
		return {}
	}
}

class WilmaAccountInstance {
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
	listServers: require("./starsoft/servers.ts")
}