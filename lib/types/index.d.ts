/* OpenWilmaCore typings */

// Accounts

/**
 * Wilma session object
 * @param {String} id Session ID
 * @param {String} formkey Form key for sending form data
 * @param {String} secret Account secret
 * @param {String} slug Possible user slug (for multi-user accounts)
 */
export interface WilmaSession {
    id: String,
    formkey: String,
    secret: String,
    slug: String
}

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
