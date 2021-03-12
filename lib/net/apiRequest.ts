// Axios wrapper

const axios = require("axios")

// Typings
import {RequestHeader, RequestOptions, RequestResponse} from "../types/apiRequest"
import Errors from "../utils/error"

// Functions

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
        typeof options === "object" &&
        options.body != undefined ? typeof options.body === "object" : true &&
        options.headers != undefined ? Array.isArray(options.headers) : true
    ) { 
        // Make sure method is in lower case
        method = method.toLowerCase()

        // Build URL from session if using endpoint
        if(options.endpoint != undefined) {
            if(options.session === undefined) throw new Errors.APIRequestPreflightError("Failed to build url from endpoint and session. Required values missing.")
            options.url = options.session.server + options.endpoint
        }

        // If URL is still undefined, we need to throw an error right here
        if(options.url === undefined) throw new Errors.APIRequestPreflightError("Request url undefined.")

        // Build headers
        if(options.headers === undefined) options.headers = []
        let headers: any = {}
        for(let i: number = 0; i < options.headers.length; i++) {
            let header: RequestHeader = options.headers[i]
            // Verify header
            if(header.name === undefined || header.value === undefined) {
                throw new Errors.APIRequestPreflightError("Invalid header at index " + i)
            } else {
                // Valid header
                if(headers[header.name] != undefined) {
                    throw new Errors.APIRequestPreflightError("Overwrote existing header with header at index " + i)
                } else {
                    // Can write
                    headers[header.name] = header.value
                }
            }
        }

        // Always ask for json formatting
        if(method.toLowerCase() === "get") {
            // If we have a get request, put this in the url
            // Note: If this query parameter in post parameters, A bug triggers and the server returns unexpected responses. Thus we only pass this for GET requests.
            if(options.url.includes("?")) {
                options.url = options.url + "&format=json&CompleteJson" // This could be done better
            } else {
                options.url = options.url + "?format=json&CompleteJson"
            }
        } else {
            // See note above
            if(options.body != undefined) {
                options.body.format = "json"
                options.body.CompleteJson = ""
            } 
        }

        // Request body formatting
        if(headers["Content-Type"] === undefined) {
            // This means we will use default of Application/json if we have a non-get request
            // Otherwise don't set the header
            if(method != "get") {
                headers["Content-Type"] = "application/json"
            }
        } else {
            // We have a custom header.
            switch(headers["Content-Type"].toLowerCase()) {
            case "application/x-www-form-urlencoded":
                // Encode the body
                try {
                    let temp = ""
                    let keys: string[] = Object.keys(options.body)
                    for(let i: number = 0; i < keys.length; i++) {
                        if(temp != "") temp = temp + "&"
                        if(options.excludeEncoding != undefined && Array.isArray(options.excludeEncoding) && options.excludeEncoding.includes(keys[i])) {
                            temp = temp + encodeURIComponent(keys[i]) + "=" + options.body[keys[i]]
                        } else {
                            temp = temp + encodeURIComponent(keys[i]) + "=" + encodeURIComponent(options.body[keys[i]])
                        }
                    }
                    options.body = temp
                }
                catch(err) {
                    console.error(err) // Print this for now
                    throw new Errors.APIRequestPreflightError("Failed to create request body according to format.")
                }
                break
            default:
                // Nothing to do here for now. Axios will handle formatting for other stuff.
            }
        }

        // Append custom headers from session
        if(options.session != undefined) headers["Cookie"] = (headers["Cookie"] === undefined ? "" : headers["Cookie"] + "; ") + "Wilma2SID=" + options.session.id + ";"

        // Append credentials to application/json body by default
        if(headers["Content-Type"] != undefined && headers["Content-Type"].toLowerCase() === "application/json" && options.body != undefined) {
            if(options.body.format === undefined) options.body.format = "json"
            if(options.body.CompleteJson === undefined) options.body.CompleteJson = true
            if(options.session != null) {
                if(options.body.formkey === undefined) options.body.formkey = options.session.formkey
                if(options.body.secret === undefined) options.body.secret = options.session.secret
            }
        }

        // Add user-agent header
        if(headers["User-Account"] === undefined) headers["User-Account"] = "OpenWilma/1.0.0"

        // Perform request through axios
        let req = axios({
            url: options.url,
            method: method.toUpperCase(),
            data: options.body,
            timeout: options.timeout === undefined ? 30000 : options.timeout,
            headers: headers,
            maxRedirects: options.redirect === false ? 0 : 10,
            validateStatus: options.statusCheck,
        })
        req.catch((err: Error) => {
            throw new Errors.APIRequestPostflightError(err)
        })
        return req.then((response: any) => {
            return {
                data: response.data != undefined ? response.data : null,
                status: response.status != undefined ? response.status : "000",
                headers: response.headers
            }
        })
    } else {
        throw new Errors.APIRequestError("Invalid request arguments")
    }
}

export default {
    get: async function(options: RequestOptions) {
        return request("get", options)
    },
    post: async function(options: RequestOptions) {
        return request("post", options)
    },
    put: async function(options: RequestOptions) {
        return request("put", options)
    }
}