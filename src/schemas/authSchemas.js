export const authSchemas = {
    login: {
        email: { type: 'string', required: true, format: 'email' },
        password: { type: 'string', required: true, minLength: 6 },
    },
    register: {
        name: { type: 'string', required: true, minLength: 2 },
        email: { type: 'string', required: true, format: 'email' },
        password: { type: 'string', required: true, minLength: 6 },
        phone: { type: 'string', required: true, minLength: 7 },
    },
    forgotPassword: {
        email: { type: 'string', required: true, format: 'email' },
    },
    resetPassword: {
        token: { type: 'string', required: true },
        password: { type: 'string', required: true, minLength: 6 },
    },
    updateProfile: {
        name: { type: 'string', required: false, minLength: 2 },
        phone: { type: 'string', required: false, minLength: 7 },
        avatar: { type: 'string', required: false },
    },
    updateSettings: {
        dark_mode: { type: 'boolean', required: false },
        follow_system: { type: 'boolean', required: false },
    },
}
