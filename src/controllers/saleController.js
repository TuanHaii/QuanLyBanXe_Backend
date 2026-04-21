import {
    getAllSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale,
} from '../services/saleService.js'
import { successResponse } from '../utils/apiResponse.js'

export const listSales = async (req, res, next) => {
    try {
        const sales = await getAllSales({
            status: req.query.status,
            query: req.query.query,
        })
        return successResponse(res, sales, 'Sales loaded successfully')
    } catch (error) {
        next(error)
    }
}

export const getSale = async (req, res, next) => {
    try {
        const sale = await getSaleById(req.params.id)
        return successResponse(res, sale, 'Sale loaded successfully')
    } catch (error) {
        next(error)
    }
}

export const createSaleHandler = async (req, res, next) => {
    try {
        const sale = await createSale(req.body)
        return successResponse(res, sale, 'Sale created successfully')
    } catch (error) {
        next(error)
    }
}

export const updateSaleHandler = async (req, res, next) => {
    try {
        const sale = await updateSale(req.params.id, req.body)
        return successResponse(res, sale, 'Sale updated successfully')
    } catch (error) {
        next(error)
    }
}

export const deleteSaleHandler = async (req, res, next) => {
    try {
        const payload = await deleteSale(req.params.id)
        return successResponse(res, payload, 'Sale deleted successfully')
    } catch (error) {
        next(error)
    }
}
