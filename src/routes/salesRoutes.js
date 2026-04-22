import express from 'express'
import { getSaleDetail, listSales } from '../controllers/salesController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'
import { validateParams, validateQuery } from '../validators/requestValidator.js'
import { saleSchemas } from '../schemas/index.js'

const router = express.Router()

router.get('/', requireAuth, validateQuery(saleSchemas.listSales), listSales)
router.get('/:id', requireAuth, validateParams(saleSchemas.getSaleById), getSaleDetail)

export default router
