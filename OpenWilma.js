// -- Modules --
// (These get replaced with the appropriate module class)
let parser = null
let request = null

// -- memory --
let cache = {
    token: null,
    sessionId: null,
    messages: null,
    servers: []
    //..etc (cache results)
}

// -- Classes --
class messages {
    async get(id){

    }
    async getAll(category){

    }
    async send(){

    }
}
class message {
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
class schedule {
    async get(date){

    }
    async getCurrent(){

    }
}
class choices {
    //No idea what needed here
}
class exams {
    async get(id){

    }
    async getAll(){

    }
}
class attendence {
    async get(id){

    }
    async getAll(){

    }
}
class attendenceSingle {
    //Actions per attendence note, no idea what goes here tho
}
class printouts {
    async getAll(){

    }
}
class feedback {
    //No idea what goes here
}
class enrollment {
    //No idea what goes here
}
class trays {
    async getAll(){

    }
    async get(period){

    }
    async set(period, position, boolean){
        
    }
}
class news {
    async list(){

    }
    async getId(){

    }
}
class catalog {
    async get(){

    }
}
class profile {
    async self(){

    }
    async get(id){

    }
    async getAll(){

    }
}
class strategy {
    async list(){

    }
    async get(id){

    }
}
class forms {
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
    async _checkUrl(){
        return new Promise(async (resolve, reject) => {
            try {
                request.get({
                    url: "https://www.starsoft.fi/wilmat/wilmat.json",
                }).then(async result => {
                    if(result.status == 200){
                        let data = await parser.format(result.body)
                        cache.servers = data.wilmat
                        resolve(cache.servers)
                    }else {
                        reject([null, result])
                    }
                }).catch(async err => {
                    reject(err)
                })
            }
            catch(err){
                reject(err)
            }
        })
    }
    async login(){
        
    }
    async logout(){

    }
}

// -- Export --
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory)
    } else if (typeof module === 'object' && module.exports) {
        parser = require("../bin/parser.js")
        request = require("../bin/requestNode.js")
        module.exports = factory()
    } else {
        document.write('<' + 'script src="' + "../bin/parser.js" + '"' + ' type="text/javascript"><' + '/script>');
        document.write('<' + 'script src="' + "../bin/requestBrowser.js" + '"' +' type="text/javascript"><' + '/script>');
        root.returnExports = factory()
    }
}(typeof self !== 'undefined' ? self : this, function () {
    return OpenWilma
}));