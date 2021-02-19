// API Request typings

import {WilmaSession} from "./WilmaSession"

export type RequestHeader = {
    name: string,
    value: string
}

export interface RequestOptions {
    url: string,
    headers?: Array<RequestHeader>,
    body?: string|any,
    timeout?: number,
    session?: WilmaSession,
    excludeEncoding?: string[] // Exclude these from the response data encoder
}

export interface RequestResponse {
    status: number|string,
    data: any,
    headers: any
}