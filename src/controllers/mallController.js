import { getMallProducts, sellMallCar } from '../services/mallService.js'
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

export const sellMallProduct = async (req, res, next) => {
    try {
        const payload = await sellMallCar({
            carId: req.params.id,
            seller: req.user,
            payload: req.body,
        })

        return successResponse(res, payload, 'Bán xe thành công')
    } catch (error) {
        next(error)
    }
}
