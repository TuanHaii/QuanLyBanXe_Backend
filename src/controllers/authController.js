import {
    buildUserResponse,
    createAuthToken,
    getUserByToken,
    loginUser,
    registerUser,
    updateProfile,
    updateSettings,
} from '../services/authService.js'
import { errorResponse, successResponse } from '../utils/apiResponse.js'

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return errorResponse(res, 400, 'Email và mật khẩu là bắt buộc')
        }

        const user = await loginUser({ email, password })
        if (!user) {
            return errorResponse(res, 401, 'Email hoặc mật khẩu không đúng')
        }

        const payload = buildUserResponse(user)
        const token = createAuthToken(user)
        return res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            token,
            user: payload,
            data: payload,
        })
    } catch (error) {
        next(error)
    }
}

export const register = async (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body
        if (!name || !email || !password || !phone) {
            return errorResponse(res, 400, 'Name, email, password và phone là bắt buộc')
        }

        const user = await registerUser({ name, email, password, phone })
        if (!user) {
            return errorResponse(res, 409, 'Email đã được sử dụng')
        }

        const payload = buildUserResponse(user)
        const token = createAuthToken(user)
        return res.status(200).json({
            success: true,
            message: 'Đăng ký thành công',
            token,
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

export const getProfile = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization?.replace('Bearer ', '') || ''
        const user = await getUserByToken(authToken)
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

export const updateProfileController = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization?.replace('Bearer ', '') || ''
        const user = await getUserByToken(authToken)
        if (!user) {
            return errorResponse(res, 401, 'Token không hợp lệ')
        }
        const updated = await updateProfile(user, req.body)
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

export const getSettings = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization?.replace('Bearer ', '') || ''
        const user = await getUserByToken(authToken)
        if (!user) {
            return errorResponse(res, 401, 'Token không hợp lệ')
        }
        return res.status(200).json({
            success: true,
            message: 'Cài đặt người dùng',
            preferences: user.preferences ?? { dark_mode: true, follow_system: true },
            data: { preferences: user.preferences ?? { dark_mode: true, follow_system: true } },
        })
    } catch (error) {
        next(error)
    }
}

export const updateSettingsController = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization?.replace('Bearer ', '') || ''
        const user = await getUserByToken(authToken)
        if (!user) {
            return errorResponse(res, 401, 'Token không hợp lệ')
        }
        const updated = await updateSettings(user, req.body)
        return res.status(200).json({
            success: true,
            message: 'Cập nhật cài đặt thành công',
            preferences: updated.preferences ?? { dark_mode: true, follow_system: true },
            data: { preferences: updated.preferences ?? { dark_mode: true, follow_system: true } },
        })
    } catch (error) {
        next(error)
    }
}
