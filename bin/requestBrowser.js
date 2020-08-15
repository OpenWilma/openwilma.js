// Http/Https request library for browsers
export class Request {
    /**
     * Perform a GET request
     * @param {{url: "", body: "", headers: }} options 
     */
    async get(options){
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