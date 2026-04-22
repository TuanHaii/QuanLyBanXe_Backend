import {
    buildUserResponse,
    getUserByToken,
    loginUser,
    registerUser,
    updateProfile,
    updateSettings,
} from '../services/authService.js'
import { errorResponse, successResponse } from '../utils/apiResponse.js'

export const login = (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return errorResponse(res, 400, 'Email và mật khẩu là bắt buộc')
        }

        const user = loginUser({ email, password })
        if (!user) {
            return errorResponse(res, 401, 'Email hoặc mật khẩu không đúng')
        }

        const payload = buildUserResponse(user)
        return res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            token: user.token,
            user: payload,
            data: payload,
        })
    } catch (error) {
        next(error)
    }
}

export const register = (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body
        if (!name || !email || !password || !phone) {
            return errorResponse(res, 400, 'Name, email, password và phone là bắt buộc')
        }

        const user = registerUser({ name, email, password, phone })
        if (!user) {
            return errorResponse(res, 409, 'Email đã được sử dụng')
        }

        const payload = buildUserResponse(user)
        return res.status(200).json({
            success: true,
            message: 'Đăng ký thành công',
            token: user.token,
            user: payload,
            data: payload,
        })
    } catch (error) {
        next(error)
    }
}

export const logout = (req, res, next) => {
    try {
        return successResponse(res, null, 'Đăng xuất thành công')
    } catch (error) {
        next(error)
    }
}

export const forgotPassword = (req, res, next) => {
    try {
        const { email } = req.body
        if (!email) {
            return errorResponse(res, 400, 'Email là bắt buộc')
        }
        return successResponse(res, null, 'Yêu cầu đặt lại mật khẩu đã được gửi')
    } catch (error) {
        next(error)
    }
}

export const resetPassword = (req, res, next) => {
    try {
        const { token, password } = req.body
        if (!token || !password) {
            return errorResponse(res, 400, 'Token và mật khẩu mới là bắt buộc')
        }
        return successResponse(res, null, 'Mật khẩu đã được cập nhật')
    } catch (error) {
        next(error)
    }
}

export const getProfile = (req, res, next) => {
    try {
        const authToken = req.headers.authorization?.replace('Bearer ', '') || ''
        const user = getUserByToken(authToken)
        if (!user) {
            return errorResponse(res, 401, 'Token không hợp lệ')
        }
        const payload = buildUserResponse(user)
        return res.status(200).json({
            success: true,
            message: 'Thông tin người dùng',
            ...payload,
            data: payload,
        })
    } catch (error) {
        next(error)
    }
}

export const updateProfileController = (req, res, next) => {
    try {
        const authToken = req.headers.authorization?.replace('Bearer ', '') || ''
        const user = getUserByToken(authToken)
        if (!user) {
            return errorResponse(res, 401, 'Token không hợp lệ')
        }
        const updated = updateProfile(user, req.body)
        const payload = buildUserResponse(updated)
        return res.status(200).json({
            success: true,
            message: 'Cập nhật hồ sơ thành công',
            ...payload,
            data: payload,
        })
    } catch (error) {
        next(error)
    }
}

export const getSettings = (req, res, next) => {
    try {
        const authToken = req.headers.authorization?.replace('Bearer ', '') || ''
        const user = getUserByToken(authToken)
        if (!user) {
            return errorResponse(res, 401, 'Token không hợp lệ')
        }
        return res.status(200).json({
            success: true,
            message: 'Cài đặt người dùng',
            preferences: user.preferences,
            data: { preferences: user.preferences },
        })
    } catch (error) {
        next(error)
    }
}

export const updateSettingsController = (req, res, next) => {
    try {
        const authToken = req.headers.authorization?.replace('Bearer ', '') || ''
        const user = getUserByToken(authToken)
        if (!user) {
            return errorResponse(res, 401, 'Token không hợp lệ')
        }
        const updated = updateSettings(user, req.body)
        return res.status(200).json({
            success: true,
            message: 'Cập nhật cài đặt thành công',
            preferences: updated.preferences,
            data: { preferences: updated.preferences },
        })
    } catch (error) {
        next(error)
    }
}
