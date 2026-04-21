export class ApiError extends Error {
    constructor(status, message) {
        super(message)
        this.status = status
        Error.captureStackTrace(this, this.constructor)
    }
}

export const badRequest = (message) => new ApiError(400, message)
export const unauthorized = (message) => new ApiError(401, message)
export const forbidden = (message) => new ApiError(403, message)
export const notFound = (message) => new ApiError(404, message)
export const conflict = (message) => new ApiError(409, message)
export const internalServerError = (message) => new ApiError(500, message)
