import express from 'express'
import healthRoutes from './healthRoutes.js'
import exampleRoutes from './exampleRoutes.js'

const router = express.Router()

router.use('/health', healthRoutes)
router.use('/example', exampleRoutes)

export default router
