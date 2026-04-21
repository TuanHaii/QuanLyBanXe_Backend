import { getAllCars } from '../services/carService.js'
import { successResponse } from '../utils/apiResponse.js'

export const listMallProducts = async (req, res, next) => {
    try {
        const products = await getAllCars({
            category: req.query.category,
            query: req.query.query,
        })
        return successResponse(res, products, 'Mall products loaded successfully')
    } catch (error) {
        next(error)
    }
}
