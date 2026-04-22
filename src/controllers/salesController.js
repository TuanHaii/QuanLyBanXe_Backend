import { getSaleById, getSales } from '../services/salesService.js'
import { errorResponse, successResponse } from '../utils/apiResponse.js'

export const listSales = (req, res, next) => {
    try {
        const filters = {
            status: req.query.status,
            query: req.query.query,
        }
        const data = getSales(filters)
        return successResponse(res, data, 'Danh sách sales')
    } catch (error) {
        next(error)
    }
}

export const getSaleDetail = (req, res, next) => {
    try {
        const saleId = req.params.id
        const sale = getSaleById(saleId)
        if (!sale) {
            return errorResponse(res, 404, 'Sale không tồn tại')
        }
        return successResponse(res, sale, 'Chi tiết sale')
    } catch (error) {
        next(error)
    }
}
