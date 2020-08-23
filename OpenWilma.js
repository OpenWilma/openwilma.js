// -- Modules --
// All of these are loaded dynamically based on the platform you have because of minor differences in the supported platforms.
// These modules will function the same regardless of the platform.
let parser = null
let request = null

// -- Config --
const config = {
    supportedApiVersions: ["11"]
}
const messageDirs = ["archive", "drafts", "sent"]
// -- Memory --
let memory = {
    session: {
        token: null,
        sessionId: null,
        server: null,
        serverName: "",
        lastRequest: null
    },
    cache: { //TODO: Implement caching with 30s intervals
        messages: {
            inbox: null,
            drafts: null,
            sent: null,
            archive: null
        },
        servers: []
    }
    //..etc (cache results)
}

// -- Classes --
class message { //Class for each message
    async markAsRead(){
        
    }
    async archive(){

    }
    async unArchive(){

    }
    async delete(){

    }
}
class messages { //Messages class
    async get(id){
        return new Promise(async (resolve, reject) => {
            try {
                request.get({
                    url: memory.session.server + "/messages/" + id + "?format=json",
                    headers: {
                        Cookie: "Wilma2SID=" + memory.session.token
                    }
                }).then(async res => {
                    parser.format(res[1].body).then(async json => {
                        parser.message(json.messages[0]).then(async msg => {
                            let _class = new message()
                            let ar = Object.keys(msg)
                            for(let i = 0; ar.length > i; i++){
                                _class[ar[i]] = msg[ar[i]]
                            }
                            resolve(_class)
                        }).catch(async err => {
                            reject(err)
                        })
                    }).catch(async err => {
                        reject(err)
                    })
                }).catch(async err => {
                    reject(err)
                })
            }
            catch(err){
                reject(err)
            }
        })
    }
    async getAll(category){
        return new Promise(async (resolve, reject) => {
            try {
                if(category == "inbox" || category == undefined){
                    request.get({
                        url: memory.session.server + "/messages/list",
                        headers: {
                            Cookie: "Wilma2SID=" + memory.session.token
                        }
                    }).then(async res => {
                        parser.format(res[1].body).then(async json => {
                            parser.messages(json.Messages).then(async msgs => {
                                memory.cache.messages.inbox = msgs
                                resolve(msgs)
                            })
                        }).catch(async err => {
                            reject(err)
                        })
                    }).catch(async err => {
                        reject(err)
                    })
                }else {
                    if(messageDirs.includes(category)){
                        
                    }else {
                        reject("Unkown category. Supported: " + messageDirs.join(", "))
                    }
                }
            }
            catch(err){
                reject(err)
            }
        })
    }
    async send(){
        //TODO: How the f Do I do this again :p
    }
}
class schedule { //Schedule class
    async get(date){
        return new Promise(async (resolve, reject) => {
            try {
                if(/([0-9]{1,})\.([0-9]{1,})\.([0-9]{1,})/g.test(date)){
                    request.get({
                        url: memory.session.server + "/schedule?date=" + date,
                        headers: {
                            "Cookie": "Wilma2SID=" + memory.session.token + ";"
                        }
                    }).then(async res => {
                        parser.schedule(res[1].body).then(async json => {
                            resolve(json)
                        }).catch(async err => {
                            reject(err)
                        }) 
                    }).catch(async err => {
                        reject(err)
                    })  
                }else {
                    reject("Invalid date format")
                }
            }
            catch(err){
                reject(err)
            }   
        })
    }
    async getCurrent(){
        return new Promise(async (resolve, reject) => {
            try {
                request.get({
                    url: memory.session.server + "/schedule",
                    headers: {
                        "Cookie": "Wilma2SID=" + memory.session.token + ";"
                    }
                }).then(async res => {
                    parser.schedule(res[1].body).then(async json => {
                        console.log(json)
                    }).catch(async err => {
                        reject(err)
                    }) 
                }).catch(async err => {
                    reject(err)
                })  
            }
            catch(err){
                reject(err)
            }   
        })
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
        //TODO: Events?
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
                            memory.session.lastRequest = new Date().getTime()
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
     * Refresh the session if it's not being upkept with normal requests
     */
    async _refreshSession(){
        if(this.refreshLoop != null) this.refreshLoop = null
        this.refreshLoop = setInterval(async () => {
            if((memory.session.lastRequest + 25) >= new Date().getTime()){
                request.get({
                    url: memory.session.server + "/overview", //Is this valid?
                    args: ["NoRedirects"]
                }).then(async res => {
                    memory.session.lastRequest = new Date().getTime()
                }).catch(async err => {
                    throw new Error(err)
                })
            }
        }, 500)
    }
    /**
     * Login to a secondary account that the logged in account has permission to control
     * @param {*} id 
     */
    async setUser(id){

    }
    /**
     * Login to a Wilma server
     * @param {String} server The Wilma server
     * @param {String} username The username of the Wilma account
     * @param {String} password The password of the Wilma account
     * @returns Promise()
     */
    async login(server, username, password){ //Login to wilma
        return new Promise(async (resolve, reject) => {
            try {
                this._getList().then(async res => {
                    if(res[0] != null){
                        reject(res[0])
                    }else {
                        let found = false
                        for(let i = 0;i < res[1].length;i++){
                            if(res[1][i].url === server){
                                memory.session.server = server
                                memory.session.serverName = res[1][i].name
                                found = true
                                break
                            }
                        }
                        if(found == false){
                            reject("No such Wilma server available.")
                        }else {
                            request.get({
                                url: server + "/index_json"
                            }).then(async res1 => {
                                if(res1[0] != null){
                                    reject(res1[0])
                                }else {
                                    parser.format(res1[1].body).then(async data => {
                                        if(config.supportedApiVersions.includes(data.ApiVersion.toString())){
                                            if(data.SessionID != undefined){
                                                memory.session.sessionId = data.SessionID
                                                request.post({
                                                    url: server + "/login",
                                                    body: {
                                                        Login: username,
                                                        Password: password,
                                                        SESSIONID: data.SessionID,
                                                        CompleteJson: null,
                                                        format: "Json"
                                                    },
                                                    headers: {
                                                        "Content-Type": "application/x-www-form-urlencoded"
                                                    },
                                                    args: ["NoRedirects"]
                                                }).then(async res2 => {
                                                    if(res2[0] != null){
                                                        reject(res2[0])
                                                    }else {
                                                        if(res2[1].error != undefined){
                                                            reject(res2[1])
                                                        }else {
                                                            memory.session.lastRequest = new Date().getTime()
                                                            this._refreshSession()
                                                            memory.session.token = res2[1].cookies.Wilma2SID.value
                                                            resolve()
                                                        }   
                                                    }
                                                }).catch(async err1 => {
                                                    reject(err1)
                                                })
                                            }else {
                                                reject("SessionID missing from response body.")
                                            }
                                        }else {
                                            reject("Unsupported ApiVersion: " + data.ApiVersion + ", supported: " + config.supportedApiVersions.join(", "))
                                        }
                                    }).catch(async err => {
                                        reject("Unexpected parser error: " + err)
                                    })
                                }
                            }).catch(async err => {
                                reject(err)
                            })
                        }
                    }   
                })
            }
            catch(err){
                reject(err)
            }
        })
    }
    /**
     * Logout from a Wilma server
     */
    async logout(){ //Logout from wilma. TODO: Does this work...?
        return new Promise(async (resolve, reject) => {
            try {
                request.post({
                    url: memory.session.server + "/logout",
                    headers: {
                        "Cookie": "Wilma2SID=" + memory.session.token + ";",
                        CompleteJson: null,
                        format: "Json",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: {
                        FormKey: memory.session.sessionId
                    },
                    args: ["NoRedirects"]
                }).then(async res => {
                    resolve()
                }).catch(async err => {
                    reject(err)
                })
            }
            catch(err){
                reject(err)
            }   
        })
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