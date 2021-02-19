export interface WilmaServer {
    url: string,
    name: string,
    formerUrl?: string
}

export interface WilmaApiCredentials {
    sessionId: string,
    formkey: string,
    secret: string
}
