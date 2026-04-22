import { getNotificationById, getNotificationCount, getNotifications, readNotification } from '../services/notificationService.js'
import { errorResponse, successResponse } from '../utils/apiResponse.js'

export const listNotifications = (req, res, next) => {
    try {
        const filters = {
            category: req.query.category,
            is_read: req.query.is_read,
        }
        const data = getNotifications(filters)
        return successResponse(res, data, 'Danh sách thông báo')
    } catch (error) {
        next(error)
    }
}

export const getNotificationDetail = (req, res, next) => {
    try {
        const notificationId = req.params.id
        const notification = getNotificationById(notificationId)
        if (!notification) {
            return errorResponse(res, 404, 'Thông báo không tồn tại')
        }
        return successResponse(res, notification, 'Thông báo chi tiết')
    } catch (error) {
        next(error)
    }
}

export const getNotificationCountController = (req, res, next) => {
    try {
        const filters = {
            is_read: req.query.is_read,
        }
        const count = getNotificationCount(filters)
        return successResponse(res, { count }, 'Số lượng thông báo')
    } catch (error) {
        next(error)
    }
}

export const markNotificationAsRead = (req, res, next) => {
    try {
        const notificationId = req.params.id
        const notification = readNotification(notificationId)
        if (!notification) {
            return errorResponse(res, 404, 'Thông báo không tồn tại')
        }
        return successResponse(res, notification, 'Đã đánh dấu thông báo là đã đọc')
    } catch (error) {
        next(error)
    }
}
