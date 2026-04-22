import { getDashboardSummary } from '../services/dashboardService.js'
import { successResponse } from '../utils/apiResponse.js'

export const getDashboard = async (req, res, next) => {
    try {
        const data = await getDashboardSummary()
        return successResponse(res, data, 'Tổng quan dashboard')
    } catch (error) {
        next(error)
    }
}
