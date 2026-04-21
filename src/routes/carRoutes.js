import express from 'express'
import {
    listCars,
    getCar,
    createCarHandler,
    updateCarHandler,
    deleteCarHandler,
} from '../controllers/carController.js'
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', listCars)
router.get('/:id', getCar)
router.post('/', authenticate, createCarHandler)
router.put('/:id', authenticate, updateCarHandler)
router.delete('/:id', authenticate, deleteCarHandler)

export default router
