const normalizeDecimal = (value) => (value === null || value === undefined ? 0 : Number(value))

const normalizeBoolean = (value) => {
    if (typeof value === 'boolean') {
        return value
    }

    if (typeof value === 'string') {
        if (value === 'true') return true
        if (value === 'false') return false
        if (value === 'available') return true
        if (value === 'sold') return false
        if (value === 'reserved') return true
    }

    if (typeof value === 'number') {
        return value !== 0
    }

    return true
}

export const mapCar = (row) => ({
    maXe: row.maXe ?? row.id,
    id: row.id ?? String(row.maXe ?? ''),
    tenXe: row.tenXe ?? row.name ?? '',
    giaBan: normalizeDecimal(row.giaBan ?? row.price),
    namSanXuat: row.namSanXuat ?? row.year ?? 0,
    mauSac: row.mauSac ?? row.color ?? '',
    soKhung: row.soKhung ?? '',
    soMay: row.soMay ?? '',
    dungTich: row.dungTich ?? null,
    soLuongTon: row.soLuongTon ?? row.stock ?? 0,
    trangThai: normalizeBoolean(row.trangThai ?? row.status),
    maHang: row.maHang ?? 0,
    maLoaiXe: row.maLoaiXe ?? 0,
    HangXe: row.HangXe ?? row.hangXe ?? null,
    LoaiXe: row.LoaiXe ?? row.loaiXe ?? null,
    createdAt: row.createdAt ?? row.created_at ?? null,
    updatedAt: row.updatedAt ?? row.updated_at ?? null,
})
