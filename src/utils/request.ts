// Note: To be tested!
// Wrapper for the "fetch" function in browser environments to function as a compatibility layer for a native http 
const fetchWrapperRequest = {
    end: async (url: string, options: any, body: Buffer[], headers: requestHeaders, eventFunctions: requestWrapperRequestEvent[]): Promise<{statusCode: number, headers: responseHeaders}> => {
        const fetchHeaders = new Headers()
        for (const header of Object.keys(headers)) fetchHeaders.append(header, headers[header])
        const res = await fetch(url, {
            method: options.method,
            headers: fetchHeaders,
            body: body.toString() // Yeah ik, buffers meant nothing after all
        })
        let responseHeaders: any = []
        for (const header of res.headers.keys()) responseHeaders[header] = res.headers.get(header)
        // Fake the body data coming in
        for (const event of eventFunctions) {
            if (event.event === "data") {
                event.callback(res.body)
            }
        }

        return {
            statusCode: res.status,
            headers: responseHeaders
        }
    }
}
const fetchWrapper: requestWrapper = {
    request: (url: string, options: any, callback: (arg0: requestWrapperResponse) => void): requestWrapperRequest => {
        let headers: requestHeaders = {}
        const written: Buffer[] = []
        let ended = false
        const eventFunctions: requestWrapperRequestEvent[] = []
        const on = (event: string, callback: (param1: any) => void) => {
            eventFunctions.push({ event, callback })
        }
        let statusCode = 0
        callback({ on, once: on, headers, statusCode }) // Yeah... deal with it
        return {
            end: () => {
                if (ended) throw new Error("Request already closed")
                ended = true
                fetchWrapperRequest.end(url, options, written, headers, eventFunctions).then((data) => {
                    headers = data.headers
                    statusCode = data.statusCode

                    // Fake the response end, this is a guaranteed "once" event
                    for (const event of eventFunctions) {
                        if (event.event === "end") {
                            event.callback(undefined)
                        }
                    }
                })
            },
            setHeader: (name: string, value: string) => {
                if (ended) throw new Error("Request already closed")
                headers[name] = value
            },
            write: (val: string | Buffer) => {
                if (ended) throw new Error("Request already closed")
                written.push(typeof val === "string" ? Buffer.from(val) : val)
            }
        }
    }
}

/**
 * Request utility
 */
export async function request(method: string, url: string | import("url").URL, headers: requestHeaders, body: string, options: requestOptions): Promise<requestResponse> {
    return new Promise((resolve, reject) => {
        // Construct target url
        let targetUrl
        if (!options?.overrideURLValidation && !(url instanceof URL)) {
            try {
                targetUrl = new URL(url)
            } catch (error) {
                reject(new URLParsingError(`Failed to parse given URL: ${error}`))
            }
        } else {
            targetUrl = url
        }

        // Get the appropriate request library
        let lib
        if (typeof require === "undefined") { // Browser environment
            lib = fetchWrapper
        } else {
            // Node.JS environment
            const protocol = typeof url !== "string" ? url.protocol.toLowerCase().split(":")[0] : url.toLowerCase().split(":")[0]
            if (!["http", "https"].includes(protocol)) reject(new URLParsingError("Unsupported protocol"))
            lib = require(protocol)
        }

        // Make the request
        const req = lib.request(targetUrl, { method }, (res: any) => {
            const buffer: Buffer[] = []
            res.on("data", (chunk: Buffer) => buffer.push(chunk))
            res.once("end", () => resolve({
                status: res.statusCode,
                headers: res.headers,
                data: options?.stringify ? options?.json ? JSON.parse(Buffer.concat(buffer).toString()) : Buffer.concat(buffer).toString() : Buffer.concat(buffer)
            }))
        })

        // Send headers
        if (headers !== undefined && Object.keys(headers).length !== 0) for (const header of Object.keys(headers)) req.setHeader(header, headers[header])

        if (options?.overrideContentLength) req.setHeader("Content-Length", options.overrideContentLength)
        else if (body !== undefined && body.length > 0) {
            req.setHeader("Content-Length", Buffer.byteLength(body))
            req.write(body)
        }

        // End the request
        req.end()
    })
}