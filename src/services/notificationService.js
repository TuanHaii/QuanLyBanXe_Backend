import prisma from './prismaClient.js'

const mapNotification = (log) => ({
    id: String(log.maLog),
    category: log.danhMuc ?? 'Hệ thống',
    title: log.tieuDe ?? log.hanhDong,
    message: log.noiDung ?? '',
    icon: log.icon ?? 'system',
    is_read: log.daDoc,
    created_at: log.thoiGian.toISOString(),
})

export const getNotifications = async ({ maTaiKhoan, category, is_read } = {}) => {
    const normalizedCategory = category?.trim().toLowerCase()
    let normalizedIsRead
    if (Object.hasOwn({ is_read }, 'is_read')) {
        normalizedIsRead = typeof is_read === 'string'
            ? is_read.toLowerCase() === 'true'
            : Boolean(is_read)
    }

    const notifications = await prisma.nhatKyHoatDong.findMany({
        where: {
            ...(maTaiKhoan ? { maTaiKhoan } : {}),
            ...(normalizedCategory ? { danhMuc: { contains: normalizedCategory, mode: 'insensitive' } } : {}),
            ...(normalizedIsRead === undefined ? {} : { daDoc: normalizedIsRead }),
        },
        orderBy: { thoiGian: 'desc' },
    })

    return notifications.map(mapNotification)
}

export const getNotificationById = async (id) => {
    const notification = await prisma.nhatKyHoatDong.findUnique({
        where: { maLog: Number(id) },
    })

    return notification ? mapNotification(notification) : null
}

export const getNotificationCount = async ({ maTaiKhoan, is_read } = {}) => {
    let normalizedIsRead
    if (Object.hasOwn({ is_read }, 'is_read')) {
        normalizedIsRead = typeof is_read === 'string'
            ? is_read.toLowerCase() === 'true'
            : Boolean(is_read)
    }

    return prisma.nhatKyHoatDong.count({
        where: {
            ...(maTaiKhoan ? { maTaiKhoan } : {}),
            ...(normalizedIsRead === undefined ? {} : { daDoc: normalizedIsRead }),
        },
    })
}

export const readNotification = async (id) => {
    const notification = await prisma.nhatKyHoatDong.update({
        where: { maLog: Number(id) },
        data: { daDoc: true },
    })

    return mapNotification(notification)
}
