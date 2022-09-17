interface requestOptions {
    overrideContentLength: boolean,
    overrideURLValidation: boolean,
    stringify: boolean,
    json: boolean
}

interface requestHeaders {
    [key: string]: string
}

interface responseHeaders {
    [key: string]: string
}

interface requestResponse {
    status: number,
    headers: responseHeaders,
    data: Buffer | String | Object
}

interface requestWrapperRequest {
    setHeader: (name: string, value: string) => void,
    end: () => void,
    write: (param1: Buffer | string) => void,
}

interface requestWrapperResponse {
    on: (event: string, callback: (param1: any) => void) => void,
    once: (event: string, callback: (param1: any) => void) => void,
    headers: responseHeaders,
    statusCode: number
}

interface requestWrapperRequestEvent {
    event: string,
    callback: (param1: any) => void
}

interface requestWrapper {
    request: (url: string, options: any, callback: () => {}) => requestWrapperRequest
}
