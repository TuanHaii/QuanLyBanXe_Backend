import express from 'express'
import {
    createCarController,
    deleteCarController,
    getCarDetail,
    listCars,
    updateCarController,
} from '../controllers/carController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'
import { validateBody } from '../validators/requestValidator.js'
import { carSchemas } from '../schemas/index.js'

const router = express.Router()

router.get('/', requireAuth, listCars)
router.get('/:id', requireAuth, getCarDetail)
router.post('/', requireAuth, validateBody(carSchemas.createCar), createCarController)
router.put('/:id', requireAuth, validateBody(carSchemas.updateCar), updateCarController)
router.delete('/:id', requireAuth, deleteCarController)

export default router
