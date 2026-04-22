import { getReportGoals, getReportSummary } from '../services/reportService.js'
import { successResponse } from '../utils/apiResponse.js'

export const getReportSummaryController = (req, res, next) => {
    try {
        const data = getReportSummary()
        return successResponse(res, data, 'Báo cáo của tôi')
    } catch (error) {
        next(error)
    }
}

export const getReportGoalsController = (req, res, next) => {
    try {
        const data = getReportGoals()
        return successResponse(res, data, 'Mục tiêu báo cáo')
    } catch (error) {
        next(error)
    }
}
