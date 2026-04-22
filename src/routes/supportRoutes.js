import express from 'express'
import { contactSupport, getSupportRequest, listSupportItems, listSupportRequests } from '../controllers/supportController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'
import { validateBody, validateParams } from '../validators/requestValidator.js'
import { supportSchemas } from '../schemas/index.js'

const router = express.Router()

router.get('/', listSupportItems)
router.post('/contact', requireAuth, validateBody(supportSchemas.contactSupport), contactSupport)
router.get('/requests', requireAuth, listSupportRequests)
router.get('/requests/:id', requireAuth, validateParams(supportSchemas.getSupportRequestById), getSupportRequest)

export default router
