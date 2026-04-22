import express from 'express'
import authRoutes from './authRoutes.js'
import carRoutes from './carRoutes.js'
import dashboardRoutes from './dashboardRoutes.js'
import exampleRoutes from './exampleRoutes.js'
import historyRoutes from './historyRoutes.js'
import mallRoutes from './mallRoutes.js'
import notificationRoutes from './notificationRoutes.js'
import reportRoutes from './reportRoutes.js'
import supportRoutes from './supportRoutes.js'
import salesRoutes from './salesRoutes.js'
import healthRoutes from './healthRoutes.js'
import catalogRoutes from './catalogRoutes.js'

const router = express.Router()

router.use('/health', healthRoutes)
router.use('/example', exampleRoutes)
router.use('/auth', authRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/mall', mallRoutes)
router.use('/notifications', notificationRoutes)
router.use('/reports', reportRoutes)
router.use('/support', supportRoutes)
router.use('/history', historyRoutes)
router.use('/sales', salesRoutes)
router.use('/cars', carRoutes)
router.use('/catalog', catalogRoutes)

export default router
