// Http/Https request library for Node.Js
class Request {
    constructor(){
        this.http = require("http")
        this.https = require("https")
        this.url = require("url")
    }
    /**
     * Perform a GET request. Returns an array on promise resolve. First element is the error (null for success). Second element is the error message on promise rejection and the request result on resolve.
     * @param {{url: "", body: {}, headers: {"HEADERNAME": "VALUE","HEADERNAME": "VALUE"}}} options The options object
     */
    async get(options){
        return new Promise(async (resolve, reject) => {
            try {
                if(typeof options == "object" && options.url != undefined){
                    let url = this.url.parse(options.url)
                    if(this[url.protocol.replace(":", "")] == undefined) {
                        reject(["Unkown protocol.", null])
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
                                resolve([null, {
                                    status: res.statusCode,
                                    body: collection,
                                    message: res.statusMessage
                                }])
                            })
                        })
                        if(options.body != undefined){
                            let format = null
                            try {
                                format = JSON.stringify(options.body)
                            }
                            catch(err){
                                reject([err, "Cannot format the request body. Please make sure it's valid."])
                                return
                            }
                            req.write(format)
                        }
                        req.end()
                    }
                }else { 
                    reject(["Invalid options. Expected to be an object, the url value is required.", null])
                }
            }
            catch(err){
                reject([err, null])
            }
        })
    }
    /**
     * Perform a POST request. Returns an array on promise resolve. First element is the error (null for success). Second element is the error message on promise rejection and the request result on resolve.
     * @param {{url: "", body: {}, headers: {"HEADERNAME": "VALUE","HEADERNAME": "VALUE"}}} options The options object
     */
    async post(options){
        return new Promise(async (resolve, reject) => {
            try {
                if(typeof options == "object" && options.url != undefined){
                    let url = this.url.parse(options.url)
                    if(this[url.protocol.replace(":", "")] == undefined) {
                        reject(["Unkown protocol.", null])
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
                                resolve([null, {
                                    status: res.statusCode,
                                    body: collection,
                                    message: res.statusMessage
                                }])
                            })
                        })
                        if(options.body != undefined){
                            let format = null
                            try {
                                format = JSON.stringify(options.body)
                            }
                            catch(err){
                                reject([err, "Cannot format the request body. Please make sure it's valid."])
                                return
                            }
                            req.write(format)
                        }
                        req.end()
                    }
                }else { 
                    reject(["Invalid options. Expected to be an object, the url value is required.", null])
                }
            }
            catch(err){
                reject([err, null])
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
        request = new Request()
    }
}(typeof self !== 'undefined' ? self : this, function () {
    return new Request()
}));
