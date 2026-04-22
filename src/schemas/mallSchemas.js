export const mallSchemas = {
    listMallProducts: {
        category: { type: 'string', required: false },
        query: { type: 'string', required: false, minLength: 1 },
    },
    sellMallProductParams: {
        id: { type: 'string', required: true, minLength: 1 },
    },
    sellMallProductBody: {
        hoTen: { type: 'string', required: true, minLength: 2 },
        sdt: { type: 'string', required: true, minLength: 8 },
        email: { type: 'string', required: false, format: 'email' },
        diaChi: { type: 'string', required: false },
        diemTichLuy: { type: 'number', required: false, min: 0 },
        phuongThucThanhToan: { type: 'string', required: false, minLength: 2 },
    },
}
