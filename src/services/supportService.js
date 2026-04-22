import prisma from './prismaClient.js'

export const getSupportItems = () => {
    return [
        {
            id: 'support-001',
            title: 'Trung tâm hỗ trợ',
            description: 'Xem câu hỏi thường gặp và hướng dẫn sử dụng.',
            type: 'support_center',
        },
        {
            id: 'support-002',
            title: 'Liên hệ chúng tôi',
            description: 'Gửi yêu cầu hỗ trợ hoặc tư vấn nhanh.',
            type: 'contact',
        },
        {
            id: 'support-003',
            title: 'Về ứng dụng',
            description: 'Thông tin phiên bản và chính sách.',
            type: 'about',
        },
    ]
}

export const submitSupportContact = async ({ maTaiKhoan, name, email, message }) => {
    const request = await prisma.nhatKyHoatDong.create({
        data: {
            maTaiKhoan,
            hanhDong: 'support_contact',
            tieuDe: name,
            noiDung: message,
            danhMuc: email,
            icon: 'support',
            daDoc: false,
        },
    })

    return {
        id: String(request.maLog),
        name,
        email,
        message,
        status: 'pending',
        created_at: request.thoiGian.toISOString(),
    }
}

export const getSupportContacts = async ({ maTaiKhoan, email, status } = {}) => {
    const requests = await prisma.nhatKyHoatDong.findMany({
        where: {
            ...(maTaiKhoan ? { maTaiKhoan } : {}),
            hanhDong: 'support_contact',
        },
        orderBy: { thoiGian: 'desc' },
    })

    return requests
        .map((request) => ({
            id: String(request.maLog),
            name: request.tieuDe ?? '',
            email: request.danhMuc ?? email ?? '',
            message: request.noiDung ?? '',
            status: request.daDoc ? 'resolved' : 'pending',
            created_at: request.thoiGian.toISOString(),
        }))
        .filter((request) => {
            if (email && request.email.toLowerCase() !== email.toLowerCase()) {
                return false
            }

            if (status && request.status !== status) {
                return false
            }

            return true
        })
}

export const getSupportRequestById = async (id) => {
    const request = await prisma.nhatKyHoatDong.findUnique({
        where: { maLog: Number(id) },
    })

    if (request?.hanhDong === 'support_contact') {
        return {
            id: String(request.maLog),
            name: request.tieuDe ?? '',
            email: request.danhMuc ?? '',
            message: request.noiDung ?? '',
            status: request.daDoc ? 'resolved' : 'pending',
            created_at: request.thoiGian.toISOString(),
        }
    }

    return null
}
