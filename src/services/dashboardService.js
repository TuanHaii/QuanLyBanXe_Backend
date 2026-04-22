import { Prisma } from '@prisma/client'

import prisma from './prismaClient.js'

const toNumber = (value) => Number(value ?? 0)

export const getDashboardSummary = async () => {
    const [carCount, stockAggregation, completedSales, revenueAggregation, recentInvoices] = await Promise.all([
        prisma.xe.count(),
        prisma.xe.aggregate({ _sum: { soLuongTon: true } }),
        prisma.hoaDon.count({ where: { trangThai: 1 } }),
        prisma.hoaDon.aggregate({ _sum: { tongTien: true }, where: { trangThai: 1 } }),
        prisma.hoaDon.findMany({
            take: 5,
            orderBy: { ngayLap: 'desc' },
            include: {
                khachHang: true,
                nhanVien: true,
                chiTietHoaDon: {
                    include: {
                        xe: true,
                    },
                },
            },
        }),
    ])

    const summary = {
        totalCars: carCount,
        carsSold: completedSales,
        inStock: toNumber(stockAggregation._sum.soLuongTon),
        totalRevenue: toNumber(revenueAggregation._sum.tongTien),
        revenueTrend: '+0%',
        totalRevenueLabel: new Intl.NumberFormat('vi-VN', {
            maximumFractionDigits: 0,
        }).format(toNumber(revenueAggregation._sum.tongTien)),
        salesTrend: '+0%',
    }

    const recent_transactions = recentInvoices.map((invoice) => ({
        id: String(invoice.maHoaDon),
        car_name: invoice.chiTietHoaDon[0]?.xe?.tenXe ?? 'Hóa đơn bán xe',
        customer_name: invoice.khachHang?.hoTen ?? 'Khách hàng',
        amount: new Prisma.Decimal(invoice.tongTien).toNumber(),
        status: invoice.trangThai,
        date: invoice.ngayLap.toISOString(),
    }))

    return {
        summary,
        recent_transactions,
    }
}
