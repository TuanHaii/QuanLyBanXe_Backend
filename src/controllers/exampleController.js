import { getExampleData } from '../services/exampleService.js'
import { successResponse } from '../utils/apiResponse.js'

export const getExample = (req, res, next) => {
    try {
        const data = getExampleData()
        return successResponse(res, data, 'Example data loaded')
    } catch (error) {
        next(error)
    }
}
