import express from 'express'
import healthRoutes from './healthRoutes.js'
import exampleRoutes from './exampleRoutes.js'
import authRoutes from './authRoutes.js'
import carRoutes from './carRoutes.js'
import mallRoutes from './mallRoutes.js'
import saleRoutes from './saleRoutes.js'

const router = express.Router()

router.use('/health', healthRoutes)
router.use('/example', exampleRoutes)
router.use('/auth', authRoutes)
router.use('/cars', carRoutes)
router.use('/mall', mallRoutes)
router.use('/sales', saleRoutes)

export default router
