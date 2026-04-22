import { getAllSales, getSaleById as getSaleByIdFromDb } from './saleService.js'

export const getSales = async ({ status, query } = {}) => {
    return getAllSales({ status, query })
}

export const getSaleById = async (id) => {
    return getSaleByIdFromDb(id)
}
