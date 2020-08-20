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
                    let url = null
                    let error = false
                    try {
                        url = new URL(options.url)
                    }
                    catch(err){
                        error = true
                        reject(["Invalid Url (" + err + ").", null])
                    }
                    finally {
                        if(error == false){
                            if(url.protocol.replace(":", "") != "http" && url.protocol.replace(":", "") != "https") {
                                reject(["Unkown protocol.", null])
                            }else {
                                let req = new XMLHttpRequest()
                                req.onreadystatechange = function() {
                                    if(this.readyState == 4) {
                                        resolve([null, {
                                            status: req.status,
                                            body: req.responseText,
                                            message: req.statusText
                                        }])
                                    }
                                }
                                if(options.headers.length != 0){
                                    let index = 0
                                    Object.keys(options.headers).forEach(async header => {
                                        let value = options.headers[header]
                                        try {
                                            req.setRequestHeader(header, value)
                                            ++index
                                            if(index == options.headers.length){
                                                //Code continues here
                                                req.open("GET", options.url, true)
                                                if(options.body != undefined){
                                                    let format = null
                                                    try {
                                                        format = JSON.stringify(options.body)
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
                                        catch(err){
                                            reject([err, "Failed to process: " + JSON.stringify(header)])
                                        }
                                    })
                                }else {
                                    //Code continues here
                                    req.open("GET", options.url, true)
                                    if(options.body != undefined){
                                        let format = null
                                        try {
                                            format = JSON.stringify(options.body)
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
                        }
                    }
                }else { 
                    reject([false, "Invalid options. Expected to be an object, the url value is required."])
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
                            let req = new XMLHttpRequest()
                            req.onreadystatechange = function() {
                                if(this.readyState == 4) {
                                    resolve([null, {
                                        status: req.status,
                                        body: req.responseText,
                                        message: req.statusText
                                    }])
                                }
                            }
                            if(options.headers.length != 0){
                                let index = 0
                                Object.keys(options.headers).forEach(async header => {
                                    let value = options.headers[header]
                                    try {
                                        req.setRequestHeader(header, value)
                                        ++index
                                        if(index == options.headers.length){
                                            //Code continues here
                                            req.open("POST", options.url, true)
                                            if(options.body != undefined){
                                                let format = null
                                                try {
                                                    format = JSON.stringify(options.body)
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
                                    catch(err){
                                        reject([err, "Failed to process: " + JSON.stringify(header)])
                                    }
                                })
                            }else {
                                //Code continues here
                                req.open("POST", options.url, true)
                                if(options.body != undefined){
                                    let format = null
                                    try {
                                        format = JSON.stringify(options.body)
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