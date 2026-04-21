export const mapUser = (row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    role: row.role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
})

export const sanitizeUser = (row) => {
    if (!row) return null
    return {
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        role: row.role,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    }
}
