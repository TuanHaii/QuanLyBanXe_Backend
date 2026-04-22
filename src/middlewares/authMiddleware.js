import { getUserByToken } from '../services/authService.js'
import { errorResponse } from '../utils/apiResponse.js'

export const requireAuth = (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return errorResponse(res, 401, 'Yêu cầu xác thực Bearer token')
    }

    const token = authorization.replace('Bearer ', '')
    const user = getUserByToken(token)
    if (!user) {
        return errorResponse(res, 401, 'Token không hợp lệ hoặc đã hết hạn')
    }

    req.user = user
    next()
}
