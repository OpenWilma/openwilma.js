// OpenWilma error types

/**
 * Wilma API external (server() error 
 */
class WAPIServerError extends Error {
    constructor(m: any){
        super(m)
        Object.setPrototypeOf(this, Error.prototype)
        this.name = "WAPIServerError"
    }
}

/**
 * Wilma Auth error
 */
class WilmaAuthError extends Error {
    constructor(m: any){
        super(m)
        Object.setPrototypeOf(this, Error.prototype)
        this.name = "WilmaAuthError"
    }
}

/**
 * Wilma API internal error
 */
class WAPIError extends Error {
    constructor(m: any){
        super(m)
        Object.setPrototypeOf(this, Error.prototype)
        this.name = "WAPIError"
    }
}

/**
 * Starsoft API Error
 */
class SAPIError extends Error {
    constructor(m: any){
        super(m)
        Object.setPrototypeOf(this, Error.prototype)
        this.name = "SAPIError"
    }
}

/**
 * Axios wrapper error
 */
class APIRequestError extends Error {
    constructor(m: any){
        super(m)
        Object.setPrototypeOf(this, Error.prototype)
        this.name = "APIRequestError"
    }
}
class APIRequestPreflightError extends Error {
    constructor(m: any){
        super(m)
        Object.setPrototypeOf(this, Error.prototype)
        this.name = "APIRequestPreflightError"
    }
}
class APIRequestPostflightError extends Error {
    constructor(m: any){
        super(m)
        Object.setPrototypeOf(this, Error.prototype)
        this.name = "APIRequestPostflightError"
    }
}

export default {
    SAPIError: SAPIError,
    APIRequestError: APIRequestError,
    APIRequestPreflightError: APIRequestPreflightError,
    APIRequestPostflightError: APIRequestPostflightError,
    WAPIError: WAPIError,
    WAPIServerError: WAPIServerError,
    WilmaAuthError
}
