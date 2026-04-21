import { verifyAuthToken } from '../services/authService.js'
import { errorResponse } from '../utils/apiResponse.js'

export const authenticate = async (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return errorResponse(res, 401, 'Unauthorized: missing authorization token')
    }

    const token = authorization.replace('Bearer ', '').trim()
    try {
        const user = await verifyAuthToken(token)
        if (!user) {
            return errorResponse(res, 401, 'Unauthorized: invalid token')
        }

        req.user = user
        return next()
    } catch (error) {
        return errorResponse(res, 401, error.message || 'Unauthorized')
    }
}
