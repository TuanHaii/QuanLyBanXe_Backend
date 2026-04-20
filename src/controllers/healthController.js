import { healthCheck } from '../services/healthService.js'
import { successResponse } from '../utils/apiResponse.js'

export const getHealth = (req, res, next) => {
    try {
        const data = healthCheck()
        return successResponse(res, data, 'Service is healthy')
    } catch (error) {
        next(error)
    }
}
