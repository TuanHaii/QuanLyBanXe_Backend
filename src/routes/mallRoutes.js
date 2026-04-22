import express from 'express'
import { listMallProducts, sellMallProduct } from '../controllers/mallController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'
import { validateBody, validateParams, validateQuery } from '../validators/requestValidator.js'
import { mallSchemas } from '../schemas/index.js'

const router = express.Router()

router.get('/', requireAuth, validateQuery(mallSchemas.listMallProducts), listMallProducts)
router.post(
    '/:id/sell',
    requireAuth,
    validateParams(mallSchemas.sellMallProductParams),
    validateBody(mallSchemas.sellMallProductBody),
    sellMallProduct,
)

export default router
