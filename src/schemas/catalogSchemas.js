export const catalogSchemas = {
    createBrand: {
        tenHang: { type: 'string', required: true, minLength: 1 },
        quocGia: { type: 'string', required: false, minLength: 1 },
    },
    createCategory: {
        tenLoai: { type: 'string', required: true, minLength: 1 },
    },
}
