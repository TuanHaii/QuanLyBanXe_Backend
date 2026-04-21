import {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updateUserProfile,
} from '../services/authService.js'
import { successResponse } from '../utils/apiResponse.js'

export const register = async (req, res, next) => {
    try {
        const payload = await registerUser(req.body)
        return successResponse(res, payload, 'User registered successfully')
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const payload = await loginUser(req.body)
        return successResponse(res, payload, 'Login successful')
    } catch (error) {
        next(error)
    }
}

export const logout = async (req, res, next) => {
    try {
        const payload = await logoutUser()
        return successResponse(res, payload, 'Logout successful')
    } catch (error) {
        next(error)
    }
}

export const requestPasswordReset = async (req, res, next) => {
    try {
        const payload = await forgotPassword(req.body.email)
        return successResponse(res, payload, 'If the email is registered, reset instructions were sent')
    } catch (error) {
        next(error)
    }
}

export const resetPasswordHandler = async (req, res, next) => {
    try {
        const payload = await resetPassword(req.body)
        return successResponse(res, payload, 'Password reset successful')
    } catch (error) {
        next(error)
    }
}

export const getProfile = async (req, res, next) => {
    try {
        const payload = await getUserProfile(req.user.id)
        return successResponse(res, payload, 'User profile loaded')
    } catch (error) {
        next(error)
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        const payload = await updateUserProfile(req.user.id, req.body)
        return successResponse(res, payload, 'Profile updated successfully')
    } catch (error) {
        next(error)
    }
}
