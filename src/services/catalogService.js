import prisma from './prismaClient.js'

const normalizeName = (value) => value?.trim() ?? ''

const findBrandByName = async (tenHang) => {
    const normalizedName = normalizeName(tenHang)
    if (!normalizedName) {
        return null
    }

    return prisma.hangXe.findFirst({
        where: {
            tenHang: {
                equals: normalizedName,
                mode: 'insensitive',
            },
        },
    })
}

const findCategoryByName = async (tenLoai) => {
    const normalizedName = normalizeName(tenLoai)
    if (!normalizedName) {
        return null
    }

    return prisma.loaiXe.findFirst({
        where: {
            tenLoai: {
                equals: normalizedName,
                mode: 'insensitive',
            },
        },
    })
}

export const listBrands = async () => {
    return prisma.hangXe.findMany({
        orderBy: { tenHang: 'asc' },
    })
}

export const createBrandIfMissing = async (data) => {
    const normalizedName = normalizeName(data.tenHang)
    if (!normalizedName) {
        return null
    }

    const existing = await findBrandByName(normalizedName)
    if (existing) {
        return existing
    }

    return prisma.hangXe.create({
        data: {
            tenHang: normalizedName,
            quocGia: data.quocGia?.trim() || null,
        },
    })
}

export const listCategories = async () => {
    return prisma.loaiXe.findMany({
        orderBy: { tenLoai: 'asc' },
    })
}

export const createCategoryIfMissing = async (data) => {
    const normalizedName = normalizeName(data.tenLoai)
    if (!normalizedName) {
        return null
    }

    const existing = await findCategoryByName(normalizedName)
    if (existing) {
        return existing
    }

    return prisma.loaiXe.create({
        data: {
            tenLoai: normalizedName,
        },
    })
}
