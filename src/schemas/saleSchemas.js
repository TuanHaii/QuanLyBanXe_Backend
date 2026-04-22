export const saleSchemas = {
    listSales: {
        status: { type: 'string', required: false, enum: ['pending', 'completed', 'cancelled'] },
        query: { type: 'string', required: false, minLength: 1 },
    },
    getSaleById: {
        id: { type: 'string', required: true },
    },
}
