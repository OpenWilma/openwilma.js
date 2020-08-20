const { S_IFIFO } = require("constants")
const { rmdirSync } = require("fs")

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
                if(options.args == undefined) options.args = []
                if(typeof options == "object" && options.url != undefined){
                    let url = this.url.parse(options.url)
                    if(this[url.protocol.replace(":", "")] == undefined) {
                        reject(["Unkown protocol.", null])
                    }else {
                        let self = this
                        let redirects = 0
                        async function request(url, methdoOptional){
                            let req = self[url.protocol.replace(":", "")].request({
                                host: url.host.includes(":") ? url.host.split(":")[0] : url.host,
                                path: url.path,
                                port: url.port,
                                method: methdoOptional == undefined ? "GET" : methdoOptional,
                                query: url.query,
                                followAllRedirects: options.args.includes("NoRedirects") ? false : true, //TODO: Do we need this?
                                headers: options.headers
                            }, async res => {
                                let collection = ""
                                res.on("data", async data => {
                                    collection = collection + data.toString()
                                })
                                res.on("end", async () => {
                                    res.statusCode = res.statusCode.toString()
                                    if(res.statusCode.startsWith("2") || (res.statusCode.startsWith("3") && options.args.includes("NoRedirects"))){
                                        resolve([null, {
                                            status: res.statusCode,
                                            body: collection,
                                            message: res.statusMessage,
                                            headers: res.headers,
                                            cookies: new cookies(res.headers)
                                        }])
                                    }else if(res.statusCode.startsWith("3")){
                                        let loc = res.headers.location
                                        try {
                                            loc = url.parse(loc)
                                            if(redirects > 10){
                                                reject(["Too many redirects", collection])
                                            }else {
                                                ++redirects
                                                request(loc, options.headers["Content-Type"] == "application/x-www-form-urlencoded" ? "GET" : "POST")
                                            }
                                        }
                                        catch(err){
                                            reject(err, "Invalid requested redirection location")
                                        }
                                    }else {
                                        reject(["Server responded with " + res.statusCode, collection])
                                    }
                                })
                            })
                            if(options.body != undefined){
                                let format = null
                                try {
                                    switch (options.headers["Content-Type"]){
                                        case "application/json":
                                            format = JSON.stringify(options.body)
                                            break
                                        case "application/x-www-form-urlencoded":
                                            let temp = ""
                                            let ar = Object.keys(options.body)
                                            for(let i=0; ar.length > i;i++){
                                                let name = ar[i]
                                                let value = options.body[name]
                                                if(temp != "") temp = temp + "&"
                                                temp = temp + encodeURIComponent(name) + "=" + encodeURIComponent(value)
                                            }
                                            format = temp
                                            break
                                        default:
                                            format = options.body
                                    }
                                }
                                catch(err){
                                    reject([err, "Cannot format the request body. Please make sure it's valid."])
                                    return
                                }
                                req.write(format)
                            }
                            req.end()
                        }
                        request(url)
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
     * @param {{url: "", body: {}, headers: {"HEADERNAME": "VALUE"}, args: ["NoRedirects"?]}} options The options object
     */
    async post(options){
        return new Promise(async (resolve, reject) => {
            try {
                if(options.args == undefined) options.args = []
                if(typeof options == "object" && options.url != undefined){
                    let url = this.url.parse(options.url)
                    if(this[url.protocol.replace(":", "")] == undefined) {
                        reject(["Unkown protocol.", null])
                    }else {
                        let self = this
                        let redirects = 0
                        async function request(url, methdoOptional){
                            let req = self[url.protocol.replace(":", "")].request({
                                host: url.host.includes(":") ? url.host.split(":")[0] : url.host,
                                path: url.path,
                                port: url.port,
                                method: methdoOptional == undefined ? "POST" : methdoOptional,
                                query: url.query,
                                followAllRedirects: options.args.includes("NoRedirects") ? false : true, //TODO: Do we need this?
                                headers: options.headers
                            }, async res => {
                                let collection = ""
                                res.on("data", async data => {
                                    collection = collection + data.toString()
                                })
                                res.on("end", async () => {
                                    res.statusCode = res.statusCode.toString()
                                    if(res.statusCode.startsWith("2") || (res.statusCode.startsWith("3") && options.args.includes("NoRedirects"))){
                                        resolve([null, {
                                            status: res.statusCode,
                                            body: collection,
                                            message: res.statusMessage,
                                            headers: res.headers,
                                            cookies: new cookies(res.headers)
                                        }])
                                    }else if(res.statusCode.startsWith("3")){
                                        let loc = res.headers.location
                                        try {
                                            loc = url.parse(loc)
                                            if(redirects > 10){
                                                reject(["Too many redirects", collection])
                                            }else {
                                                ++redirects
                                                request(loc, options.headers["Content-Type"] == "application/x-www-form-urlencoded" ? "GET" : "POST")
                                            }
                                        }
                                        catch(err){
                                            reject(err, "Invalid requested redirection location")
                                        }
                                    }else {
                                        reject(["Server responded with " + res.statusCode, collection])
                                    }
                                })
                            })
                            if(options.body != undefined){
                                let format = null
                                try {
                                    switch (options.headers["Content-Type"]){
                                        case "application/json":
                                            format = JSON.stringify(options.body)
                                            break
                                        case "application/x-www-form-urlencoded":
                                            let temp = ""
                                            let ar = Object.keys(options.body)
                                            for(let i=0; ar.length > i;i++){
                                                let name = ar[i]
                                                let value = options.body[name]
                                                if(temp != "") temp = temp + "&"
                                                temp = temp + encodeURIComponent(name) + "=" + encodeURIComponent(value)
                                            }
                                            format = temp
                                            break
                                        default:
                                            format = options.body
                                    }
                                }
                                catch(err){
                                    reject([err, "Cannot format the request body. Please make sure it's valid."])
                                    return
                                }
                                req.write(format)
                            }
                            req.end()
                        }
                        request(url)
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
//Cookies clas
class cookies {
    constructor(headers){
        if(headers["set-cookie"] != undefined){
            headers["set-cookie"].forEach(async cookie => {
                let name = cookie.split("=")[0]
                let value = cookie.split("=")[1].split(";")[0]
                let path = cookie.split("Path=")[1].split(";")[0]
                this[name] = {
                    value: value,
                    path: path
                }
            })
        }
    }
}
//-- Export --
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