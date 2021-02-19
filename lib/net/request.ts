import { WilmaApiCredentials } from "../types";
import axios from "axios"

export interface RequestOptions {
    url: string,
    headers?: Map<string, string>,
    body?: string|any,
    timeout?: number,
    account?: WilmaApiCredentials
    excludeEncoding?: string[] // Exclude these from the response data encode
}

export interface RequestResponse {
    status: string,
    data: any,
    headers: any
}

/**
 * Perform a http(s) request
 * @param {string} method The HTTP(S) method
 * @param {RequestOptions} options Request options
 */

export async function request(
    method: "get" | "post" | "put", 
    options: RequestOptions
): Promise<RequestResponse> {
    const { headers = new Map(), timeout, url } = options
    let { body, account = null } = options

    // Format the request data
    if (headers.has("Content-Type")) {
        switch (headers.get("Content-Type").toLowerCase()) {
        case "application/x-www-form-urlencoded":
            body = ""

            for (const key in Object.keys(body)) {
                if (body !== "") body += "&"

                let value = body[key]
                if (options.excludeEncoding instanceof Array 
                    && !options.excludeEncoding.includes(key)) {
                    value = encodeURIComponent(value)
                }

                body += `${encodeURIComponent(key)}=${value}`
            }
            break
        case "application/json":
            if (body.format === undefined) {
                body.format = "json"
            }
            if (body.CompleteJson === undefined) {
                body.CompleteJson = true
            }
            if (account !== null) {
                if (body.formkey === undefined) {
                    body.formkey = account.formkey
                }
                if (body.secret === undefined) {
                    body.secret = account.secret
                }
            }
            break
        default:
            break
        }
    } else if (method !== "get") {
        headers.set("Content-Type", "Application/json")
    }

    if (options.session !== undefined) {
        headers.set("Cookie", `Wilma2SID=${options.session.id}`)
    }

    //if(options.session !== undefined) 
    //headers["Cookie"] = (headers["Cookie"] == undefined ? "" : 
    //headers["Cookie"] + "; ") + "Wilma2SID=" + options.session.id

    const request = await axios({
        data: body,
        timeout: timeout || 30000,
        url,
        method
    });

    return {
        data: response.data,
        status: response.status || 0,
        headers: response.headers
    }

        return req.then((response: any) => {
            return {
                data: response.data != undefined ? response.data : null,
                status: response.status != undefined ? response.status : "000",
                headers: response.headers
            }
        })
}

export default {
    get: async (options: RequestOptions): Promise<RequestResponse> => {
        return await request("get", options)
    },
    post: async (options: RequestOptions): Promise<RequestResponse> => {
        return request("post", options)
    },
    put: async (options: RequestOptions): Promise<RequestResponse> => {
        return request("put", options)
    }
}
