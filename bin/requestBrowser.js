// Http/Https request library for browsers
class Request {
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
                        url = new URL(options.url)
                    }
                    catch(err){
                        error = true
                        reject("Invalid Url (" + err + ").")
                    }
                    finally {
                        if(error == false){
                            if(url.protocol.replace(":", "") != "http" && url.protocol.replace(":", "") != "https") {
                                reject("Unkown protocol.")
                            }else {
                                let req = new XMLHttpRequest()
                                req.onreadystatechange = function() {
                                    if(this.readyState == 4) {
                                        resolve({
                                            status: req.status,
                                            body: req.responseText,
                                            message: req.statusText
                                        })
                                    }
                                }
                                req.open("GET", options.url, true)
                                if(options.body != undefined){
                                    let format = null
                                    try {
                                        format = JSON.stringify(options.body)
                                    }
                                    catch(err){
                                        reject("Cannot format the request body. Please make sure it's valid.")
                                        return
                                    }
                                    req.send(format)
                                }else {
                                    req.send()
                                }
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
                    try {
                        let url = new URL(options.url)
                        if(url.protocol.replace(":", "") != "http" && url.protocol.replace(":", "") != "https") {
                            reject("Unkown protocol.")
                        }else {
                            let req = new XMLHttpRequest()
                            req.onreadystatechange = function() {
                                if(this.readyState == 4) {
                                    resolve({
                                        status: req.status,
                                        body: req.responseText,
                                        message: req.statusText
                                    })
                                }
                            }
                            req.open("POST", options.url, true)
                            if(options.body != undefined){
                                let format = null
                                try {
                                    format = JSON.stringify(options.body)
                                }
                                catch(err){
                                    reject("Cannot format the request body. Please make sure it's valid.")
                                    return
                                }
                                req.send(format)
                            }else {
                                req.send()
                            }
                        }
                    }
                    catch(err){
                        reject(err)
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