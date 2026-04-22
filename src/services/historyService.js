import prisma from './prismaClient.js'

export const getHistoryRecords = async ({ query } = {}) => {
    const items = await prisma.hoaDon.findMany({
        orderBy: { ngayLap: 'desc' },
        include: {
            khachHang: true,
            chiTietHoaDon: {
                include: {
                    xe: true,
                },
            },
        },
    })

    const normalizedQuery = query?.trim().toLowerCase()

    return items
        .filter((item) => {
            if (!normalizedQuery) {
                return true
            }

            const searchText = [
                item.chiTietHoaDon[0]?.xe?.tenXe,
                item.khachHang?.hoTen,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()

            return searchText.includes(normalizedQuery)
        })
        .map((item) => ({
            id: String(item.maHoaDon),
            type: 'sale',
            title: item.chiTietHoaDon[0]?.xe?.tenXe ?? 'Hóa đơn bán xe',
            subtitle: item.khachHang?.hoTen ?? 'Khách hàng',
            amount: Number(item.tongTien),
            status: item.trangThai,
            date: item.ngayLap.toISOString(),
            note: item.phuongThucThanhToan ?? null,
        }))
}
