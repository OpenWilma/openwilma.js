/**
 * This error is thrown when an unexpected error has been handled.
 * 
 * These errors are often bugs or hardcoded errors.
 */
export class UnexpectedCatch extends Error {
    constructor(m: any){
        super(m)
        Object.setPrototypeOf(this, Error.prototype)
        this.name = "UnexpectedCatch"
    }
}

/**
 * Wilma API external (server() error 
 */
export class WAPIServerError extends Error {
    constructor(m: any){
        super(m)
        Object.setPrototypeOf(this, Error.prototype)
        this.name = "WAPIServerError"
    }
}
/**
 * Wilma API internal error
 */
export class WAPIError extends Error {
    constructor(m: any){
        super(m)
        Object.setPrototypeOf(this, Error.prototype)
        this.name = "WAPIError"
    }
}

/**
 * Starsoft API Error
 */
export class SAPIError extends Error {
    constructor(m: any){
        super(m)
        Object.setPrototypeOf(this, Error.prototype)
        this.name = "SAPIError"
    }
}

/**
 * Axios wrapper error
 */
export class APIRequestError extends Error {
    constructor(m: any){
        super(m)
        Object.setPrototypeOf(this, Error.prototype)
        this.name = "APIRequestError"
    }
}
export class APIRequestPreflightError extends APIRequestError {
    constructor(m: any){
        super(m)
        Object.setPrototypeOf(this, Error.prototype)
        this.name = "APIRequestPreflightError"
    }
}

export class APIRequestPostflightError extends APIRequestError {
    constructor(m: any){
        super(m)
        Object.setPrototypeOf(this, Error.prototype)
        this.name = "APIRequestPostflightError"
    }
}
