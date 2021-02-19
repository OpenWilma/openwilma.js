import { WilmaApiCredentials } from "../types"

export interface WilmaApiAddress {
    url: string
    slug?: string
}

export default class WilmaAccount {
    readonly credentials: WilmaApiCredentials
    private address: WilmaApiAddress

    constructor(credentials: WilmaApiCredentials, address: WilmaApiAddress) {
        this.credentials = credentials
        this.address = address
    }
}
