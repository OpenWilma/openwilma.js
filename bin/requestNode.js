// Http/Https request library for Node.Js
class Request {
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
                    let url = null
                    let error = false
                    try {
                        url = this.url.parse(options.url)
                    }
                    catch(err){
                        reject("Invalid Url (" + err + ").")
                    }
                    finally{
                        if(error == false){
                            try {
                                if(this[url.protocol.replace(":", "")] == undefined) {
                                    reject("Unkown protocol.")
                                }else {
                                    let req = this[url.protocol.replace(":", "")].request({
                                        host: url.host.includes(":") ? url.host.split(":")[0] : url.host,
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
                                            collection = collection + data.toString()
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
                                reject(Err)
                            }
                        }
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
                    let url = null
                    let error = false
                    try {
                        url = this.url.parse(options.url)
                    }
                    catch(err){
                        error = true
                        reject("Invalid Url (" + err + ").")
                    }
                    finally{
                        if(error == false){
                            try {
                                if(this[url.protocol.replace(":", "")] == undefined) {
                                    reject("Unkown protocol.")
                                }else {
                                    let req = this[url.protocol.replace(":", "")].request({
                                        host: url.host.includes(":") ? url.host.split(":")[0] : url.host,
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
                                            collection = collection + data.toString()
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
                                reject(Err)
                            }
                        }
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
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory)
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory()
    } else {
        root.returnExports = factory()
  }
}(typeof self !== 'undefined' ? self : this, function () {
    return new Request()
}));