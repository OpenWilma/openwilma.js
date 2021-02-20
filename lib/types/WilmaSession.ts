/**
 * Wilma session object
 * @param {string} id Session ID
 * @param {string} formkey Form key for sending form data
 * @param {string} secret Account secret
 * @param {string} slug Possible user slug (for multi-user accounts)
 * @param {string} server The Wilma server
 */
export interface WilmaSession {
    id: string
    formkey: string
    secret: string
    slug: string|null,
    server: string|null
}
