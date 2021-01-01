/* Declare variables */
const internal = {

}
// -----------------------------------------------------
/* JSDOC Types */
/**
 * The account object, which includes the username, password etc.
 * @typedef {{username: String, password: String}} OpenWilmaAccount
 * @property {String} username The name of the user to login as
 * @property {String} password The password of the account to login as
 */
/**
 * The Wilma server url
 * @typedef {String} ServerUrl
 */
/**
 * OpenWilma configuration object, which includes the OpenWilma client configuration.
 * @typedef {{account: OpenWilmaAccount, url: ServerUrl}} OpenWilmaConfiguration
 * @property {OpenWilmaAccount} account The account object
 * @property {ServerUrl} url The Wilma server url
 */
/**
 * OpenWilma session object
 * @typedef {{id: String}} OpenWilmaSession
 */
// -----------------------------------------------------
/**
 * This is the Javascript version of the OpenWilma project.
 * 
 * Author: @Esinko and Contributors 
 * 
 * Website: https://openwilma.tech
 */
class OpenWilma {
    /**
     * Create a new instance of OpenWilma
     * @param {OpenWilmaConfiguration} options The options
     */
    constructor(options){
        this.options = options
        this.session = {
            id: null
        }
    }

    /**
     * Connect to the specified Wilma server with the specified credentials
     * @returns {Promise<OpenWilmaSession>}
     */
    async connect(){
        return new Promise(async (resolve, reject) => {
            console.log("runs")
            resolve(this.session)
        })
    }
}
/* Export */
module.exports = OpenWilma