export interface WilmaServer {
    url: string,
    name: string,
    formerUrl?: string
}

export interface WilmaApiCredentials {
    id: string,
    formkey: string,
    secret: string
}
