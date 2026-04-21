import express from 'express'
import {
    login,
    register,
    logout,
    requestPasswordReset,
    resetPasswordHandler,
    getProfile,
    updateProfile,
} from '../controllers/authController.js'
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/logout', authenticate, logout)
router.post('/forgot-password', requestPasswordReset)
router.post('/reset-password', resetPasswordHandler)
router.get('/profile', authenticate, getProfile)
router.put('/profile', authenticate, updateProfile)

export default router
