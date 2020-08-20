// Http/Https request library for browsers
class Request {
    /**
     * Perform a GET request. Returns an array on promise resolve. First element is the error (null for success). Second element is the error message on promise rejection and the request result on resolve.
     * @param {{url: "", body: {}, headers: {"HEADERNAME": "VALUE","HEADERNAME": "VALUE"}}} options The options object
     * @returns Promise -> resolve(null, data), reject(error, errorMessage)
     */
    async get(options){
        return new Promise(async (resolve, reject) => {
            try {
                if(typeof options == "object" && options.url != undefined){
                    try {
                        let url = new URL(options.url)
                        if(url.protocol.replace(":", "") != "http" && url.protocol.replace(":", "") != "https") {
                            reject(["Unkown protocol.", null])
                        }else {
                            async function request(url, methodOptional){
                                let req = new XMLHttpRequest()
                                req.onreadystatechange = function() {
                                    if(this.readyState == 4) {
                                        this.status = this.status.toString()
                                        if(this.status.startsWith("2") || (this.status.startsWith("3") && options.args.includes("NoRedirects"))){
                                            resolve([null, {
                                                status: req.status,
                                                body: req.responseText,
                                                message: req.statusText,
                                                headers: new headers(this.getAllResponseHeaders()),
                                                cookies: new cookies(new headers(this.getAllResponseHeaders()))
                                            }])
                                        }else if(res.statusCode.startsWith("3")){
                                            let loc = new headers(this.getAllResponseHeaders()).location
                                            try {
                                                loc = new URL(loc)
                                                if(redirects > 10){
                                                    reject(["Too many redirects", req.responseText])
                                                }else {
                                                    ++redirects
                                                    request(loc, "GET")
                                                }
                                            }
                                            catch(err){
                                                reject(err, "Invalid requested redirection location")
                                            }
                                        }else {
                                            reject(["Server responded with " + this.status, this.responseText])
                                        }
                                    }
                                }
                                let ar = []
                                if(options.headers != undefined) ar = Object.keys(options.headers)
                                if(ar.length == 0){
                                    req.open(methodOptional != undefined ? methodOptional : "POST", url, true)
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
                                        req.send(format)
                                    }else {
                                        req.send()
                                    }
                                }else {
                                    for(let i=0;ar.length > i;i++){
                                        let name = ar[i]
                                        let value = options.headers[name]
                                        req.setRequestHeader(header, value)
                                    }   
                                    req.open(methodOptional != undefined ? methodOptional : "GET", url, true)
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
                                        req.send(format)
                                    }else {
                                        req.send()
                                    }
                                }
                            }
                            request(url)
                        }
                    }
                    catch(err){
                        reject([err, null])
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
     * @returns Promise -> resolve(null, data), reject(error, errorMessage)
     */
    async post(options){
        return new Promise(async (resolve, reject) => {
            try {
                if(typeof options == "object" && options.url != undefined){
                    try {
                        let url = new URL(options.url)
                        if(url.protocol.replace(":", "") != "http" && url.protocol.replace(":", "") != "https") {
                            reject(["Unkown protocol.", null])
                        }else {
                            async function request(url, methodOptional){
                                let req = new XMLHttpRequest()
                                req.onreadystatechange = function() {
                                    if(this.readyState == 4) {
                                        this.status = this.status.toString()
                                        if(this.status.startsWith("2") || (this.status.startsWith("3") && options.args.includes("NoRedirects"))){
                                            resolve([null, {
                                                status: req.status,
                                                body: req.responseText,
                                                message: req.statusText,
                                                headers: new headers(this.getAllResponseHeaders()),
                                                cookies: new cookies(new headers(this.getAllResponseHeaders()))
                                            }])
                                        }else if(res.statusCode.startsWith("3")){
                                            let loc = new headers(this.getAllResponseHeaders()).location
                                            try {
                                                loc = new URL(loc)
                                                if(redirects > 10){
                                                    reject(["Too many redirects", req.responseText])
                                                }else {
                                                    ++redirects
                                                    request(loc, options.headers["Content-Type"] == "application/x-www-form-urlencoded" ? "GET" : "POST")
                                                }
                                            }
                                            catch(err){
                                                reject(err, "Invalid requested redirection location")
                                            }
                                        }else {
                                            reject(["Server responded with " + this.status, this.responseText])
                                        }
                                    }
                                }
                                let ar = []
                                if(options.headers != undefined) ar = Object.keys(options.headers)
                                if(ar.length == 0){
                                    req.open(methodOptional != undefined ? methodOptional : "POST", url, true)
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
                                        req.send(format)
                                    }else {
                                        req.send()
                                    }
                                }else {
                                    for(let i=0;ar.length > i;i++){
                                        let name = ar[i]
                                        let value = options.headers[name]
                                        req.setRequestHeader(header, value)
                                    }   
                                    req.open(methodOptional != undefined ? methodOptional : "POST", url, true)
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
                                        req.send(format)
                                    }else {
                                        req.send()
                                    }
                                }
                            }
                            request(url)
                        }
                    }
                    catch(err){
                        reject([err, null])
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
//Cookie class
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
//Headers class (only in this lib)
class headers {
    constructor(headersRaw){
        headersRaw = headersRaw.replace(/\\r/g, "").split("\n")
        if(headersRaw.length != 0){
            headersRaw.forEach(async header => {
                let name = header.split(": ")[0]
                let value = header.split(": ")
                value.splice(0, 1)
                value = value.join(": ")
                this[name] = value
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