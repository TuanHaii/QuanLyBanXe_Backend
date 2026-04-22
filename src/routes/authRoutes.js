import express from 'express'
import {
    forgotPassword,
    getProfile,
    getSettings,
    login,
    logout,
    register,
    resetPassword,
    updateProfileController,
    updateSettingsController,
} from '../controllers/authController.js'
import { validateBody } from '../validators/requestValidator.js'
import { authSchemas } from '../schemas/index.js'
import { requireAuth } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/login', validateBody(authSchemas.login), login)
router.post('/register', validateBody(authSchemas.register), register)
router.post('/logout', logout)
router.post('/forgot-password', validateBody(authSchemas.forgotPassword), forgotPassword)
router.post('/reset-password', validateBody(authSchemas.resetPassword), resetPassword)
router.get('/me', requireAuth, getProfile)
router.get('/profile', requireAuth, getProfile)
router.put('/profile', requireAuth, validateBody(authSchemas.updateProfile), updateProfileController)
router.get('/settings', requireAuth, getSettings)
router.put('/settings', requireAuth, validateBody(authSchemas.updateSettings), updateSettingsController)

export default router
