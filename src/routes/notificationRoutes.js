import express from 'express'
import { getNotificationCountController, getNotificationDetail, listNotifications, markNotificationAsRead } from '../controllers/notificationController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'
import { validateParams, validateQuery } from '../validators/requestValidator.js'
import { notificationSchemas } from '../schemas/index.js'

const router = express.Router()

router.get('/count', requireAuth, validateQuery(notificationSchemas.countNotifications), getNotificationCountController)
router.get('/', requireAuth, validateQuery(notificationSchemas.listNotifications), listNotifications)
router.get('/:id', requireAuth, validateParams(notificationSchemas.getNotificationById), getNotificationDetail)
router.put(
    '/:id/read',
    requireAuth,
    validateParams(notificationSchemas.markRead),
    markNotificationAsRead,
)

export default router
