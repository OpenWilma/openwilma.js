import {User} from "./types/user";

const supportedVersions = [11] // The supported Wilma API versions
import {WilmaSession, WilmaAccountConfiguration} from "./types"
import Errors from "./utils/error"
import {listServers} from "./starsoft/servers"
import {WilmaServer} from "./types/starsoft";
import warn from "./utils/warn"
import apiRequest from "./net/apiRequest";
import { RequestResponse } from "./types/apiRequest";
import ExamManager from "./client/exam/exams";
import ProfileManager from "./client/user/profile";
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


	async userDetails(accountInstance: WilmaAccountInstance): Promise<void | WilmaAccountInstance> {
		const req = await apiRequest.get({
			url: accountInstance.session.server + "/",
			headers: [
				{name: "Cookie", value: "Wilma2SID=" + accountInstance.session.secret}
			]
		})
	}

	private async getSecrets(session: WilmaSession) {
		// SessionID is now valid. Get secret and formkey
		const creds = await apiRequest.get({
			url: session.server + "/messages",
			session: session,
		})
		if(creds.status == 200){
			// Parse secret and formkey from URL
			try {
				let secret: string = creds.data.split("name=\"secret\" value=\"")[1].split("\"")[0]
				let formkey: string = creds.data.split("name=\"formkey\" value=\"")[1].split("\"")[0]
				if(secret && formkey){
					// We got all credentials
					// Build session
					session.secret = secret;
					session.formkey = formkey;
					return session;
				}else {
					throw new Errors.WAPIParserError("Credentials response parser returned undefined for formkey or secret.")
				}
			}
			catch(err){
				throw new Errors.WAPIParserError("Failed to parse secondary credentials from messages response.")
			}
		} else {
			throw new Errors.WAPIAuthError("Failed to fetch secondary credentials.")
		}
	}
	
	/**
	 * Login to a new Wilma account
	 * @param {WilmaAccountConfiguration} account The Wilma account configuration.
	 * @param {boolean} validateServer Validate the provider Wilma server.
	 * @param versionCheck
	 */
	async login(account: WilmaAccountConfiguration, validateServer: boolean, versionCheck: boolean) : Promise<void | WilmaAccountInstance> {
		try {
			// Validate server
			if(validateServer){
				let servers: WilmaServer[] = await listServers()
				let result = servers.find(({url, formerUrl}) => url === account.server || formerUrl == account.server);
				if(result !== undefined) {
					// Warn about the possible usage of an old url
					if(result.formerUrl === account.server){
						warn("Supplied an old URL for a Wilma Server. Please use \"" + result.url + "\" in the future to access the \"" + result.name + "\" Wilma server.", "UsedFormerURL")
					}
				}else {
					throw new Errors.WAPIError("No such Wilma server available as: \"" + account.server + "\". If you are trying to connect to an unofficial Wilma server, disable server validation (more information in the OpenWilma documentation).")
				}
			}
			// Login
			// Check the server API version
			try {
				const WilmaServer: RequestResponse = await apiRequest.get({
					url: account.server + "/index_json"
				})
				if(WilmaServer.status == 200){
					// Check API version
					if(!supportedVersions.includes(WilmaServer.data.ApiVersion)){
						if(!versionCheck){
							throw new Errors.WAPIError("Unsupported Wilma server. You can disable this check by setting versionCheck to false (more information in the OpenWilma documentation).")
						}else {
							warn("Version check disabled.", "Version support")
						}
					}
					// Perform login steps
					const req = await apiRequest.post({
						url: account.server + "/index_json",
						body: {
							Login: account.username,
							Password: account.password,
							SESSIONID: WilmaServer.data.SessionID,
							CompleteJson: '',
							format: 'json'
						},
						headers: [
							{name: "Content-Type", value: "application/x-www-form-urlencoded"}
						],
						redirect: false,
						statusCheck: (num) => {return num == 303}
					})
					if(req.status == 303){
						// Good response
						if(req.headers['set-cookie']) {
							let sessionValue = null // The session id
							for (let cookie of req.headers['set-cookie']) {
								if(cookie.includes("Wilma2SID")) {
									// Wilma COOKIE
									let sessionId = /^(.*)Wilma2SID=([^;]+)(.*)$/.exec(cookie);
									if(sessionId !== null) {
										sessionValue = sessionId[2];
									}
								}
							}
							if(!sessionValue) {
								throw new Errors.WAPIAuthError("Sign in failed, invalid username or password?")
							}

							// TODO before attempting to get anything else, CHECK IF THIS ACCOUNT SHOULD SELECT ROLES!
							let session: WilmaSession = {
								id: sessionValue,
								secret: '',
								formkey: '',
								server: account.server,
								slug: null
							}
							let profileManager = new ProfileManager(session);
							let profileSelectionRequired = await profileManager.profileSelectionRequired();
							if (!profileSelectionRequired) {
								this.getSecrets(session).then(updatedSession => {
									return new WilmaAccountInstance(updatedSession);
								}).catch(error => {
									throw error;
								})
							} else {
								return new WilmaAccountInstance(session, true);
							}
						}else {
							throw new Errors.WAPIAuthError("SessionID cookie expected in response body.")
						}
						// Check login result
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
		catch(err){
			throw new Error(err)
		}
	}
}

/**
 * WilmaAccountInstance
 */
class WilmaAccountInstance {
	session: WilmaSession
	roleRequired: boolean


	constructor(session: WilmaSession, roleRequired: boolean=false) {
		this.session = session;
		this.roleRequired = roleRequired;
	}

	/**
	 * Profile manager
	 */
	get profile() {
		return new ProfileManager(this.session);
	}

	/* Exams */
	get exams(){
		return new ExamManager(this.session)
	}
}

module.exports = {
	client: OpenWilmaCore,
	listServers: listServers
}