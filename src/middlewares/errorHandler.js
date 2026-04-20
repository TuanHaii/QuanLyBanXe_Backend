import logger from '../../config/logger.js'
import { errorResponse } from '../utils/apiResponse.js'

export const errorHandler = (err, req, res, next) => {
    logger.error(err.message || 'Unknown error')
    const statusCode = err.status || 500
    return errorResponse(res, statusCode, err.message || 'Internal Server Error')
}
