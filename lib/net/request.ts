// Axios wrapper
// TODO: Implement custom error type
import {WilmaSession} from "../types";

const axios = require("axios")

// Typings

type RequestHeader = {
    name: string,
    value: string
}

interface RequestOptions {
    url: string,
    headers?: Array<RequestHeader>,
    body?: string|any,
    timeout?: number,
    session?: WilmaSession,
    excludeEncoding?: string[] // Exclude these from the response data encoder
}

interface RequestResponse {
    status: string,
    data: any,
    headers: any
}

// Function

/**
 * Perform a http(s) request
 * @param {string} method The HTTP(S) method
 * @param {RequestOptions} options Request options
 */
export async function request(method: string, options: RequestOptions): Promise<RequestResponse> {
    // Verify inputs
    if(
        /[get]|[post]|[put]/g.test(method) &&
        options != undefined &&
        typeof options == "object" &&
        options.body != undefined ? typeof options.body == "object" : true &&
        options.headers != undefined ? Array.isArray(options.headers) : true
    ){ 
        // Make sure method is in lower case
        method = method.toLowerCase()

        // Build headers
        if(options.headers == undefined) options.headers = []
        let headers: any = {}
        for(let i: number = 0; i < options.headers.length; i++){
            let header: RequestHeader = options.headers[i]
            // Verify header
            if(header.name == undefined || header.value == undefined){
                throw new Error("Invalid header at index " + i)
            }else {
                // Valid header
                if(headers[header.name] != undefined){
                    throw new Error("Overwrote existing header with header at index " + i)
                }else {
                    // Can write
                    headers[header.name] = header.value
                }
            }
        }

        // Request body formatting
        if(headers["Content-Type"] == undefined){
            // This means we will use default of Application/json if we have a non-get request
            // Otherwise don't set the header
            if(method != "get"){
                headers["Content-Type"] = "Application/json"
            }
        }else {
            // We have a custom header.
            switch(headers["Content-Type"].value.toLowerCase()){
            case "application/x-www-form-urlencoded":
                // Encode the body
                try {
                    let temp = ""
                    let keys: string[] = Object.keys(options.body)
                    for(let i: number = 0; i < keys.length; i++){
                        if(temp != "") temp = temp + "&"
                        // WTF is this error?
                        if(options.excludeEncoding != undefined && Array.isArray(options.excludeEncoding) && options.excludeEncoding.includes(keys[i])){
                            temp = temp + encodeURIComponent(keys[i]) + "=" + options.body[keys[i]]
                        }else {
                            temp = temp + encodeURIComponent(keys[i]) + "=" + encodeURIComponent(options.body[keys[i]])
                        }
                    }
                    options.body = temp
                }
                catch(err){
                    console.error(err) // Print this for now
                    throw new Error("Failed to create request body according to format.")
                }
                break
            default:
                // Nothing to do here. Axios will handle formatting for other stuff.
            }
        }

        // Append custom headers from session
        if(options.session != undefined) headers["Cookie"] = (headers["Cookie"] == undefined ? "" : headers["Cookie"] + "; ") + "Wilma2SID=" + options.session.id

        // Append credentials to application/json body by default
        if(headers["Content-Type"] != undefined && headers["Content-Type"].toLoweCase() == "application/json"){
            if(options.body.format == undefined) options.body.format = "json"
            if(options.body.CompleteJson == undefined) options.body.CompleteJson = true
            if(options.session != null){
                if(options.body.formkey == undefined) options.body.formkey = options.session.formkey
                if(options.body.secret == undefined) options.body.secret = options.session.secret
            }
        }

        // Perform request through axios
        let req = axios({
            url: options.url,
            method: method,
            data: options.body,
            timeout: options.timeout == undefined ? 30000 : options.timeout
        })
        req.catch((err: Error) => {
            throw err
        })
        return req.then((response: any) => {
            return {
                data: response.data != undefined ? response.data : null,
                status: response.status != undefined ? response.status : "000",
                headers: response.headers
            }
        })
    }else {
        throw new Error("Invalid request arguments")
    }
}

export default {
    get: async function(options: RequestOptions){
        return request("get", options)
    },
    post: async function(options: RequestOptions){
        return request("get", options)
    },
    put: async function(options: RequestOptions){
        return request("put", options)
    }
}