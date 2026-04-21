import express from 'express'
import {
    listSales,
    getSale,
    createSaleHandler,
    updateSaleHandler,
    deleteSaleHandler,
} from '../controllers/saleController.js'
import { authenticate } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', listSales)
router.get('/:id', getSale)
router.post('/', authenticate, createSaleHandler)
router.put('/:id', authenticate, updateSaleHandler)
router.delete('/:id', authenticate, deleteSaleHandler)

export default router
