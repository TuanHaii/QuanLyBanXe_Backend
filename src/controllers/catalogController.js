import {
    createBrandIfMissing,
    createCategoryIfMissing,
    listBrands,
    listCategories,
} from '../services/catalogService.js'
import { successResponse } from '../utils/apiResponse.js'

export const getBrandsController = async (req, res, next) => {
    try {
        return successResponse(res, await listBrands(), 'Danh sách hãng xe')
    } catch (error) {
        next(error)
    }
}

export const createBrandController = async (req, res, next) => {
    try {
        const brand = await createBrandIfMissing(req.body)
        return successResponse(res, brand, brand ? 'Hãng xe đã sẵn sàng' : 'Không tạo được hãng xe')
    } catch (error) {
        next(error)
    }
}

export const getCategoriesController = async (req, res, next) => {
    try {
        return successResponse(res, await listCategories(), 'Danh sách loại xe')
    } catch (error) {
        next(error)
    }
}

export const createCategoryController = async (req, res, next) => {
    try {
        const category = await createCategoryIfMissing(req.body)
        return successResponse(res, category, category ? 'Loại xe đã sẵn sàng' : 'Không tạo được loại xe')
    } catch (error) {
        next(error)
    }
}
