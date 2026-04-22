import { sales } from './dataStore.js'

export const getSales = ({ status, query } = {}) => {
    let results = [...sales]

    if (status) {
        results = results.filter(
            (sale) => sale.status.toLowerCase() === status.toLowerCase(),
        )
    }

    if (query) {
        const normalized = query.toLowerCase()
        results = results.filter(
            (sale) =>
                sale.car_name.toLowerCase().includes(normalized) ||
                sale.customer_name.toLowerCase().includes(normalized) ||
                (sale.notes || '').toLowerCase().includes(normalized),
        )
    }

    return results
}

export const getSaleById = (id) => {
    return sales.find((sale) => sale.id === id)
}
