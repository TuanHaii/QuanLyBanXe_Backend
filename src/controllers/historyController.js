import { getHistoryRecords } from '../services/historyService.js'
import { successResponse } from '../utils/apiResponse.js'

export const getHistoryController = (req, res, next) => {
    try {
        const filters = {
            query: req.query.query,
        }
        const data = getHistoryRecords(filters)
        return successResponse(res, data, 'Lịch sử giao dịch')
    } catch (error) {
        next(error)
    }
}
