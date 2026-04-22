import { sales } from './dataStore.js'

export const getHistoryRecords = ({ query } = {}) => {
    let items = [...sales]

    if (query) {
        const normalized = query.toLowerCase()
        items = items.filter(
            (item) =>
                item.car_name.toLowerCase().includes(normalized) ||
                item.customer_name.toLowerCase().includes(normalized) ||
                (item.notes || '').toLowerCase().includes(normalized),
        )
    }

    return items.map((item) => ({
        id: item.id,
        type: 'sale',
        title: item.car_name,
        subtitle: item.customer_name,
        amount: item.sale_price,
        status: item.status,
        date: item.sale_date,
        note: item.notes,
    }))
}
