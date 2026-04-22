import express from 'express'
import { getReportGoalsController, getReportSummaryController } from '../controllers/reportController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', requireAuth, getReportSummaryController)
router.get('/goals', requireAuth, getReportGoalsController)

export default router
