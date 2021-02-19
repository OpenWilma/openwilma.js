import WilmaAccount from "../account/account"

export type RequestHeader = {
    name: string,
    value: string
}

export interface RequestOptions {
    url: string,
    headers?: RequestHeader[]
    body?: string|any,
    timeout?: number,
    account?: WilmaAccount
    excludeEncoding?: string[] // Exclude these from the response data encode
}

export interface RequestResponse {
    status: number,
    data: any,
    headers: any
}

