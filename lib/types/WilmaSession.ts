/**
 * Wilma session object
 * @param {String} id Session ID
 * @param {String} formkey Form key for sending form data
 * @param {String} secret Account secret
 * @param {String} slug Possible user slug (for multi-user accounts)
 */
export interface WilmaSession {
    id: String|null,
    formkey: String|null,
    secret: String|null,
    slug: String|null
}
