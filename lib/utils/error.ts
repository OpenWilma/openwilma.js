// OpenWilma error types
/**
 * This error is thrown when an unexpected error has been handled.
 * 
 * These errors are often bugs or hardcoded errors.
 */
class UnexpectedCatch extends Error {
    constructor(m: any){
        super(m)
        Object.setPrototypeOf(this, Error.prototype)
        this.name = "UnexpectedCatch"
    }
}

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
    UnexpectedCatch: UnexpectedCatch,
    SAPIError: SAPIError,
    APIRequestError: APIRequestError,
    APIRequestPreflightError: APIRequestPreflightError,
    APIRequestPostflightError: APIRequestPostflightError,
    WAPIError: WAPIError,
    WAPIServerError: WAPIServerError
}
