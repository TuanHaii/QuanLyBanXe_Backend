export const mallSchemas = {
    listMallProducts: {
        category: { type: 'string', required: false },
        query: { type: 'string', required: false, minLength: 1 },
    },
}
