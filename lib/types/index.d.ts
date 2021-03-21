/* OpenWilmaCore typings */

// Accounts

/**
 * Wilma session object
 * @param {string} id Session ID
 * @param {string} formkey Form key for sending form data
 * @param {string} secret Account secret
 * @param {string} slug Possible user slug (for multi-user accounts)
 * @param {string} server The Wilma server as a string.
 */
export interface WilmaSession {
    id: string,
    formkey: string,
    secret: string,
    slug?: string,
    server: string
}

/**
 * The Wilma account configuration
 * @param {string} username The account username
 * @param {string} password The account password
 * @param {string} server The Wilma server as a string.
 */
export interface WilmaAccountConfiguration {
    username: string,
	password: string
	server: string
}

/**
 * Wilma account instance
 * @param {WilmaSession} session The Wilma account session
 */
interface WilmaAccountInstance {
    session: WilmaSession
    // TODO: All functions will go here
} 