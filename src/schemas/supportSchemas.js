export const supportSchemas = {
    listSupportItems: {},
    contactSupport: {
        name: { type: 'string', required: true, minLength: 2 },
        email: { type: 'string', required: true, format: 'email' },
        message: { type: 'string', required: true, minLength: 10 },
    },
    getSupportRequestById: {
        id: { type: 'string', required: true },
    },
}
