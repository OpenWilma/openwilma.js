// Http/Https request library for Node.Js
module.exports = class Request {
    constructor(){
        this.http = require("http")
        this.https = require("https")
        this.url = require("url")
    }
    /**
     * Perform a GET request
     * @param {{url: "", body: "", headers: }} options 
     */
    async get(options){
        return new Promise(async (resolve, reject) => {
            try {
                if(typeof options == "object" && options.url != undefined){
                    try {
                        let url = this.url.parse(options.url)
                        if(this[url.protocol.replace(":", "")] == undefined) {
                            reject("Unkown protocol.")
                        }else {
                            let req = this[url.protocol.replace(":", "")].request({
                                host: url.host.includes(":") ? _url.host.split(":")[0] : _url.host,
                                path: url.path,
                                port: url.port,
                                method: "GET",
                                query: url.query,
                                body: options.body,
                                followAllRedirects: true,
                                headers: options.headers
                            }, async res => {
                                let collection = ""
                                res.on("data", async data => {
                                    collection = collection = data
                                })
                                res.on("end", async () => {
                                    resolve({
                                        status: res.statusCode,
                                        body: collection,
                                        message: res.statusMessage
                                    })
                                })
                            })
                            if(options.body != undefined){
                                let format = null
                                try {
                                    format = JSON.stringify(options.body)
                                }
                                catch(err){
                                    reject("Cannot format the request body. Please make sure it's valid.")
                                    return
                                }
                                req.write(format)
                            }
                            req.end()
                        }
                    }
                    catch(err){
                        reject("Invalid url.")
                    }
                }else { 
                    reject("Invalid options. Expected to be an object, the url value is required.")
                }
            }
            catch(err){
                reject(err)
            }
        })
    }
    async post(){
        return new Promise(async (resolve, reject) => {
            try {
                if(typeof options == "object" && options.url != undefined){
                    try {
                        let url = this.url.parse(options.url)
                        if(this[url.protocol.replace(":", "")] == undefined) {
                            reject("Unkown protocol.")
                        }else {
                            let req = this[url.protocol.replace(":", "")].request({
                                host: url.host.includes(":") ? _url.host.split(":")[0] : _url.host,
                                path: url.path,
                                port: url.port,
                                method: "POST",
                                query: url.query,
                                body: options.body,
                                followAllRedirects: true,
                                headers: options.headers
                            }, async res => {
                                let collection = ""
                                res.on("data", async data => {
                                    collection = collection = data
                                })
                                res.on("end", async () => {
                                    resolve({
                                        status: res.statusCode,
                                        body: collection,
                                        message: res.statusMessage
                                    })
                                })
                            })
                            if(options.body != undefined){
                                let format = null
                                try {
                                    format = JSON.stringify(options.body)
                                }
                                catch(err){
                                    reject("Cannot format the request body. Please make sure it's valid.")
                                    return
                                }
                                req.write(format)
                            }
                            req.end()
                        }
                    }
                    catch(err){
                        reject("Invalid url.")
                    }
                }else { 
                    reject("Invalid options. Expected to be an object, the url value is required.")
                }
            }
            catch(err){
                reject(err)
            }
        })
    }
}