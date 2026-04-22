import { getMallProducts } from '../services/mallService.js'
import { successResponse } from '../utils/apiResponse.js'

export const listMallProducts = async (req, res, next) => {
    try {
        const products = await getMallProducts({
            category: req.query.category,
            query: req.query.query,
        })

        return successResponse(res, products, 'Danh sách sản phẩm mall')
    } catch (error) {
        next(error)
    }
}
