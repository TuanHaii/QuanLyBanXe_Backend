import { getSupportItems, getSupportContacts, getSupportRequestById, submitSupportContact } from '../services/supportService.js'
import { errorResponse, successResponse } from '../utils/apiResponse.js'

export const listSupportItems = (req, res, next) => {
    try {
        const data = getSupportItems()
        return successResponse(res, data, 'Danh sách mục hỗ trợ')
    } catch (error) {
        next(error)
    }
}

export const contactSupport = async (req, res, next) => {
    try {
        const { name, email, message } = req.body
        if (!name || !email || !message) {
            return errorResponse(res, 400, 'Name, email và message là bắt buộc')
        }

        return submitSupportContact({
            maTaiKhoan: req.user?.maTaiKhoan,
            name,
            email,
            message,
        }).then((data) => successResponse(res, data, 'Yêu cầu hỗ trợ đã được gửi'))
    } catch (error) {
        next(error)
    }
}

export const listSupportRequests = async (req, res, next) => {
    try {
        const filters = {
            maTaiKhoan: req.user?.maTaiKhoan,
            email: req.user?.email,
            status: req.query.status,
        }
        const data = await getSupportContacts(filters)
        return successResponse(res, data, 'Danh sách yêu cầu hỗ trợ của bạn')
    } catch (error) {
        next(error)
    }
}

export const getSupportRequest = async (req, res, next) => {
    try {
        const requestId = req.params.id
        const request = await getSupportRequestById(requestId)
        if (!request || request.email.toLowerCase() !== req.user.email.toLowerCase()) {
            return errorResponse(res, 404, 'Yêu cầu hỗ trợ không tồn tại')
        }
        return successResponse(res, request, 'Chi tiết yêu cầu hỗ trợ')
    } catch (error) {
        next(error)
    }
}
