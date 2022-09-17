class URLParsingError extends Error {
    constructor(message?: string | undefined) {
        super(message)
        Object.setPrototypeOf(this, Error.prototype)
        this.name = "URLParsingError"
    }
}