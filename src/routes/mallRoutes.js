import express from 'express'
import { listMallProducts } from '../controllers/mallController.js'

const router = express.Router()

router.get('/', listMallProducts)

export default router
