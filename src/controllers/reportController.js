import { getReportGoals, getReportSummary } from '../services/reportService.js'
import { successResponse } from '../utils/apiResponse.js'

export const getReportSummaryController = async (req, res, next) => {
    try {
        const data = await getReportSummary()
        return successResponse(res, data, 'Báo cáo của tôi')
    } catch (error) {
        next(error)
    }
}

export const getReportGoalsController = async (req, res, next) => {
    try {
        const data = await getReportGoals()
        return successResponse(res, data, 'Mục tiêu báo cáo')
    } catch (error) {
        next(error)
    }
}
