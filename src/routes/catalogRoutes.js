import express from 'express'

import {
    createBrandController,
    createCategoryController,
    getBrandsController,
    getCategoriesController,
} from '../controllers/catalogController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'
import { validateBody } from '../validators/requestValidator.js'
import { catalogSchemas } from '../schemas/index.js'

const router = express.Router()

router.get('/brands', requireAuth, getBrandsController)
router.post('/brands', requireAuth, validateBody(catalogSchemas.createBrand), createBrandController)
router.get('/car-types', requireAuth, getCategoriesController)
router.post('/car-types', requireAuth, validateBody(catalogSchemas.createCategory), createCategoryController)

export default router
