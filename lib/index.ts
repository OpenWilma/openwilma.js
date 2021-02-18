import {WilmaSession} from "./types/WilmaSession"

/**
 * The Wilma account configuration
 * @param {String} username The account username
 * @param {String} password The account password
 * @param {String} server The Wilma server as a string.
 */
interface WilmaAccountConfiguration {
	username: String,
	password: String
	server: String
}

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
	 */
	async login(account: WilmaAccountConfiguration) : Promise<WilmaAccountInstance> {
		return new WilmaAccountInstance("", "", "", "")
	}
}
/**
 * Wilma account instance
 */
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

// Import starsoft api server list script
import {listServers} from "./starsoft/servers"

module.exports = {
	client: OpenWilmaCore,
	listServers: listServers
}