import { mapCar } from '../models/carModel.js'
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
