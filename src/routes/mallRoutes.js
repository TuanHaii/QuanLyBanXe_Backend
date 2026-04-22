import express from 'express'
import { listMallProducts } from '../controllers/mallController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'
import { validateQuery } from '../validators/requestValidator.js'
import { mallSchemas } from '../schemas/index.js'

const router = express.Router()

router.get('/', requireAuth, validateQuery(mallSchemas.listMallProducts), listMallProducts)

export default router
