/* OpenWilmaCore typings */

import {WilmaSession} from "./WilmaSession"

/**
 * The Wilma account configuration
 * @param {String} username The account username
 * @param {String} password The account password
 * @param {String} server The Wilma server as a string.
 */
export default interface WilmaAccountConfiguration {
    username: String,
	password: String
	server: String
}

/**
 * Wilma account instance
 * @param {WilmaSession} session The Wilma account session
 */
interface WilmaAccountInstance {
    session: WilmaSession
    // TODO: All functions will go here
} 
