// Axios wrapper
import axios from "axios"

import { 
    RequestHeader, 
    RequestOptions, 
    RequestResponse
} from "../types/apiRequest"

import { 
    APIRequestPreflightError, 
    APIRequestPostflightError,
    APIRequestError
} from "../utils/error"
import WilmaAccount from "../account/account"

// Functions

/**
 * Perform a http(s) request
 * @param {string} method The HTTP(S) method
 * @param {RequestOptions} options Request options
 */
export async function request(method: "get" | "post" | "put", options: RequestOptions): Promise<RequestResponse> {
    if (
        /[get]|[post]|[put]/g.test(method) &&
        options != undefined &&
        typeof options == "object" &&
        options.body != undefined ? typeof options.body == "object" : true &&
        options.headers != undefined ? Array.isArray(options.headers) : true
    ) { 
        // Build headers
        if (options.headers === undefined) options.headers = []

        const headers: any = {}
        for (let i = 0; i < options.headers.length; i++) {
            const header: RequestHeader = options.headers[i]
            // Verify header
            if (header.name == undefined || header.value == undefined) {
                throw new APIRequestPreflightError("Invalid header at index " + i)
            } else {
                // Valid header
                if (headers[header.name] != undefined) {
                    throw new APIRequestPreflightError("Overwrote existing header with header at index " + i)
                } else {
                    // Can write
                    headers[header.name] = header.value
                }
            }
        }
        // Get GET request responses as JSON
        if (method == "get") {
            if (options.url.includes("?")) {
                options.url = options.url + "&format=json" // This could be done better
            } else {
                options.url = options.url + "?format=json"
            }
        }

        // Request body formatting
        if (headers["Content-Type"] == undefined) {
            if (method !== "get") {
                headers["Content-Type"] = "Application/json"
            }
        } else {
            // We have a custom header.
            switch (headers["Content-Type"].value.toLowerCase()) {
            case "application/x-www-form-urlencoded":
                // Encode the body
                try {
                    let temp = ""
                    const keys: string[] = Object.keys(options.body)
                    for (let i = 0; i < keys.length; i++) {
                        if (temp != "") temp = temp + "&"
                        if (options.excludeEncoding != undefined && Array.isArray(options.excludeEncoding) && options.excludeEncoding.includes(keys[i])) {
                            temp = temp + encodeURIComponent(keys[i]) + "=" + options.body[keys[i]]
                        } else {
                            temp = temp + encodeURIComponent(keys[i]) + "=" + encodeURIComponent(options.body[keys[i]])
                        }
                    }
                    options.body = temp
                }
                catch (err) {
                    console.error(err) // Print this for now
                    throw new APIRequestPreflightError("Failed to create request body according to format.")
                }
                break
            case "application/json":
                if (options.body.format === undefined) {
                    options.body.format = "json"
                }
                if (options.body.CompleteJson === undefined) {
                    options.body.CompleteJson = true
                }
                if (options.account instanceof WilmaAccount) {
                    if (options.body.formkey == undefined) {
                        options.body.formkey = options.account.credentials.formkey
                    }
                    if (options.body.secret == undefined) {
                        options.body.secret = options.account.credentials.formkey
                    }
                }
            default:
                break
            }
        }

        // TODO: Make this more concise
        if (options.account !== undefined) 
            headers["Cookie"] = (headers["Cookie"] == undefined 
                ? "" 
                : headers["Cookie"] + "; ") + "Wilma2SID=" + options.account.credentials.id

        // Perform request through axios
        const response = await axios({
            url: options.url,
            method: method,
            data: options.body,
            timeout: options.timeout ?? 30000
        })
        //req.catch((err: Error) => {
        //    throw new APIRequestPostflightError(err)
        //})

        return {
            data: response.data ?? null,
            status: response.status ?? 0,
            headers: response.headers
        }
    } else {
        throw new APIRequestError("Invalid request arguments")
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
