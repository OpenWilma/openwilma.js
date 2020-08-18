// -- Modules --
// All of these are loaded dynamically based on the platform you have because of minor differences in the supported platforms.
// These modules will function the same regardless of the platform.
let parser = null
let request = null

// -- memory --
let memory = {
    session: {
        token: null,
        sessionId: null,
    },
    cache: {
        messages: [],
        servers: []
    }
    //..etc (cache results)
}

// -- Classes --
class messages { //Messages class
    async get(id){

    }
    async getAll(category){

    }
    async send(){

    }
}
class message { //Class for each message
    constructor(){

    }
    async markAsRead(){

    }
    async archive(){

    }
    async unArchive(){

    }
    async delete(){

    }
}
class schedule { //Schedule class
    async get(date){

    }
    async getCurrent(){

    }
}
class choices {
    //No idea what needed here
}
class exams { //Exams class
    async get(id){

    }
    async getAll(){

    }
}
class attendence { //Attendence class
    async get(id){

    }
    async getAll(){

    }
}
class attendenceSingle {
    //Actions per attendence note, no idea what goes here tho
}
class printouts { //Printouts class
    async getAll(){

    }
}
class feedback {
    //No idea what goes here
}
class enrollment {
    //No idea what goes here
}
class trays { //Trays class
    async getAll(){

    }
    async get(period){

    }
    async set(period, position, boolean){
        
    }
}
class news { //News class
    async list(){

    }
    async getId(){

    }
}
class catalog { //Catalog class
    async get(){

    }
}
class profile { //Profile class
    async self(){ //Get the active userinfo

    }
    async get(id){

    }
    async getAll(){

    }
}
class strategy { //Strategy class
    async list(){

    }
    async get(id){

    }
}
class forms { //Forms class
    async list(){

    }
    async get(id){

    }
}
// Main class
class OpenWilma {
    constructor(options){
        // Options
        this.options = options
        // Classes
        this.messages = new messages()
        this.schedule = new schedule()
        this.choices = new choices()
        this.exams = new exams()
        this.attendence = new attendence()
        this.printouts = new printouts()
        this.feedback = new feedback()
        this.enrollment = new enrollment()
        this.trays = new trays()
        this.news = new news()
        this.catalog = new catalog()
        this.profile = new profile()
        this.strategy = new strategy()
        this.forms = new forms()
    }
    /**
     * Get the list of wilma servers
     * @returns Promise([error, http(s)_response])
     */
    async _getList(){
        return new Promise(async (resolve, reject) => {
            try {
                request.get({
                    url: "https://www.starsoft.fi/wilmat/wilmat.json",
                }).then(async result => {
                    if(result[1].status == 200){
                        parser.format(result[1].body).then(async data => {
                            memory.cache.servers = data.wilmat
                            resolve([null, data.wilmat])  
                        }).catch(async err => {
                            reject([err, result])
                        })
                    }else {
                        reject([false, result])
                    }
                }).catch(async err => {
                    reject([err, result])
                })
            }
            catch(err){
                reject([err, null])
            }
        })
    }
    /**
     * Login to a secondary account that the logged in account has permission to control
     * @param {*} id 
     */
    async setUser(id){

    }
    /**
     * Login to a Wilma server
     * @param {String} server 
     * @param {String} username The username of the Wilma account
     * @param {String} password The password of the Wilma account
     */
    async login(server, username, password){ //Login to wilma
        
    }
    /**
     * Logout from a Wilma server
     */
    async logout(){ //Logout from wilma
 
    }
}

// -- Export --
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory)
        //TODO: add dependencies for this platform
    } else if (typeof module === 'object' && module.exports) {
        // Run in Node.JS mode
        parser = require("./bin/parser.js")
        request = require("./bin/requestNode.js")
        module.exports = factory()
    } else {
        // Run in browser mode, please note that Cross-origin requests must be allowed.
        document.write('<' + 'script src="' + "./bin/parser.js" + '"' + ' type="text/javascript"><' + '/script>');
        document.write('<' + 'script src="' + "./bin/requestBrowser.js" + '"' +' type="text/javascript"><' + '/script>');
        root.returnExports = factory()
    }
}(typeof self !== 'undefined' ? self : this, function () {
    //Return the main class as the exported data
    return OpenWilma
}));