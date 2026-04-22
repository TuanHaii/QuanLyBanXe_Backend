import express from 'express'
import { getHistoryController } from '../controllers/historyController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'
import { validateQuery } from '../validators/requestValidator.js'
import { historySchemas } from '../schemas/index.js'

const router = express.Router()

router.get('/', requireAuth, validateQuery(historySchemas.getHistory), getHistoryController)

export default router
