import { mapCar } from '../models/carModel.js'
import { badRequest, notFound } from '../utils/apiError.js'
import prisma from './prismaClient.js'

export const getMallProducts = async ({ category, query } = {}) => {
    const cars = await prisma.xe.findMany({
        include: {
            hangXe: true,
            loaiXe: true,
        },
        orderBy: { maXe: 'desc' },
    })

    const normalizedCategory = category?.trim().toLowerCase()
    const normalizedQuery = query?.trim().toLowerCase()

    return cars
        .map((car) => mapCar(car))
        .filter((car) => {
            if (normalizedCategory) {
                const categoryText = [
                    car.LoaiXe?.tenLoai,
                    car.HangXe?.tenHang,
                    car.trangThai ? 'đang bán' : 'ngừng bán',
                ]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase()

                if (!categoryText.includes(normalizedCategory)) {
                    return false
                }
            }

            if (normalizedQuery) {
                const searchText = [
                    car.tenXe,
                    car.HangXe?.tenHang,
                    car.LoaiXe?.tenLoai,
                    car.mauSac,
                    car.soKhung,
                    car.soMay,
                ]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase()

                return searchText.includes(normalizedQuery)
            }

            return true
        })
        .map((car) => ({
            id: String(car.maXe),
            brand: car.HangXe?.tenHang ?? '',
            model: car.tenXe,
            category: car.LoaiXe?.tenLoai ?? 'Xe',
            year: car.namSanXuat,
            price: car.giaBan,
            stock: car.soLuongTon,
            rating: 0,
            status: car.trangThai ? 'available' : 'unavailable',
            image_url: null,
            badge_label: car.trangThai ? 'Đang bán' : 'Ngừng bán',
            badge_color: car.trangThai ? '#2F855A' : '#718096',
            description: `${car.tenXe} - ${car.mauSac}`,
            created_at: car.createdAt,
            updated_at: car.updatedAt,
        }))
}

export const sellMallCar = async ({ carId, seller, payload }) => {
    const maXe = Number(carId)
    if (!Number.isFinite(maXe)) {
        throw badRequest('Mã xe không hợp lệ')
    }

    if (!seller?.maNhanVien) {
        throw badRequest('Không xác định được nhân viên bán xe')
    }

    const customerName = String(payload.hoTen ?? payload.customerName ?? '').trim()
    const customerPhone = String(payload.sdt ?? payload.customerPhone ?? '').trim()
    const customerEmail = String(payload.email ?? payload.customerEmail ?? '').trim()
    const customerAddress = String(payload.diaChi ?? payload.customerAddress ?? '').trim()
    const paymentMethod = String(payload.phuongThucThanhToan ?? 'Tiền mặt').trim()
    const loyaltyPointsInput = Number(payload.diemTichLuy ?? payload.loyaltyPoints ?? 0)
    const loyaltyPoints = Number.isFinite(loyaltyPointsInput) && loyaltyPointsInput > 0
        ? Math.floor(loyaltyPointsInput)
        : 0

    if (!customerName) {
        throw badRequest('Họ tên khách hàng là bắt buộc')
    }

    if (!customerPhone) {
        throw badRequest('Số điện thoại khách hàng là bắt buộc')
    }

    if (customerEmail && !/.+@.+\..+/.test(customerEmail)) {
        throw badRequest('Email khách hàng không hợp lệ')
    }

    return prisma.$transaction(async (tx) => {
        const car = await tx.xe.findUnique({
            where: { maXe },
            include: {
                hangXe: true,
                loaiXe: true,
            },
        })

        if (!car) {
            throw notFound('Không tìm thấy xe cần bán')
        }

        if (!car.trangThai || car.soLuongTon <= 0) {
            throw badRequest('Xe đã ngừng bán hoặc hết tồn kho')
        }

        const customerWhere = {
            OR: [
                { sdt: customerPhone },
                ...(customerEmail ? [{ email: customerEmail }] : []),
            ],
        }

        let customer = await tx.khachHang.findFirst({ where: customerWhere })

        if (customer) {
            customer = await tx.khachHang.update({
                where: { maKhachHang: customer.maKhachHang },
                data: {
                    hoTen: customerName,
                    sdt: customerPhone,
                    email: customerEmail || null,
                    diaChi: customerAddress || null,
                    diemTichLuy: {
                        increment: loyaltyPoints,
                    },
                },
            })
        } else {
            customer = await tx.khachHang.create({
                data: {
                    hoTen: customerName,
                    sdt: customerPhone,
                    email: customerEmail || null,
                    diaChi: customerAddress || null,
                    diemTichLuy: loyaltyPoints,
                },
            })
        }

        const invoice = await tx.hoaDon.create({
            data: {
                tongTien: car.giaBan,
                phuongThucThanhToan: paymentMethod,
                trangThai: 1,
                maNhanVien: seller.maNhanVien,
                maKhachHang: customer.maKhachHang,
                chiTietHoaDon: {
                    create: {
                        soLuong: 1,
                        donGia: car.giaBan,
                        thueVat: 10,
                        maXe: car.maXe,
                    },
                },
            },
        })

        const nextStock = Math.max(0, car.soLuongTon - 1)
        await tx.xe.update({
            where: { maXe: car.maXe },
            data: {
                soLuongTon: nextStock,
                trangThai: nextStock > 0 ? car.trangThai : false,
            },
        })

        await tx.nhatKyHoatDong.create({
            data: {
                maTaiKhoan: seller.maTaiKhoan,
                hanhDong: 'sale_create',
                tieuDe: `Bán xe ${car.tenXe}`,
                noiDung: `Hóa đơn #${invoice.maHoaDon} - Khách hàng: ${customer.hoTen}`,
                danhMuc: 'sales',
                icon: 'receipt',
            },
        })

        return {
            invoice: {
                maHoaDon: invoice.maHoaDon,
                ngayLap: invoice.ngayLap,
                tongTien: Number(invoice.tongTien),
                phuongThucThanhToan: invoice.phuongThucThanhToan,
                trangThai: invoice.trangThai,
            },
            car: {
                maXe: car.maXe,
                tenXe: car.tenXe,
                soLuongTon: nextStock,
                trangThai: nextStock > 0,
                giaBan: Number(car.giaBan),
            },
            customer: {
                maKhachHang: customer.maKhachHang,
                hoTen: customer.hoTen,
                sdt: customer.sdt,
                email: customer.email,
                diaChi: customer.diaChi,
                diemTichLuy: customer.diemTichLuy,
            },
            seller: {
                maNhanVien: seller.maNhanVien,
                maTaiKhoan: seller.maTaiKhoan,
                ten: seller.nhanVien?.hoTen ?? null,
            },
        }
    })
}
