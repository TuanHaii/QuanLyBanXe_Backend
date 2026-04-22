import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { prisma } from './prismaClient.js'

const JWT_SECRET = process.env.JWT_SECRET || 'quan-ly-ban-xe-dev-secret'

const buildUserInclude = {
    nhanVien: {
        include: {
            chucVu: true,
        },
    },
}

const normalizeEmail = (email) => email.trim().toLowerCase()

const ensureDefaultChucVu = async (tx) => {
    const chucVu = await tx.chucVu.findFirst({ orderBy: { maChucVu: 'asc' } })
    if (chucVu) {
        return chucVu
    }

    return tx.chucVu.create({
        data: {
            tenChucVu: 'Nhân viên',
        },
    })
}

const formatUserResponse = (user) => ({
    id: String(user.maTaiKhoan),
    name: user.nhanVien?.hoTen ?? user.tenDangNhap,
    email: user.tenDangNhap,
    phone: user.nhanVien?.sdt ?? null,
    avatar: user.nhanVien?.avatar ?? null,
    role: user.nhanVien?.chucVu?.tenChucVu ?? 'Nhân viên',
    createdAt: user.nhanVien?.createdAt?.toISOString?.() ?? null,
    updatedAt: user.nhanVien?.updatedAt?.toISOString?.() ?? null,
})

const signToken = (user) =>
    jwt.sign(
        {
            sub: String(user.maTaiKhoan),
        },
        JWT_SECRET,
        { expiresIn: '7d' },
    )

export const getUserByToken = (token) => {
    try {
        const payload = jwt.verify(token, JWT_SECRET)
        const maTaiKhoan = Number(payload.sub)
        if (!Number.isFinite(maTaiKhoan)) {
            return null
        }

        return prisma.taiKhoan.findUnique({
            where: { maTaiKhoan },
            include: buildUserInclude,
        })
    } catch (error) {
        if (
            error instanceof jwt.JsonWebTokenError ||
            error instanceof jwt.TokenExpiredError ||
            error instanceof jwt.NotBeforeError
        ) {
            return null
        }

        throw error
    }
}

export const loginUser = async ({ email, password }) => {
    const normalizedEmail = normalizeEmail(email)
    const user = await prisma.taiKhoan.findFirst({
        where: {
            OR: [
                { tenDangNhap: normalizedEmail },
                { nhanVien: { email: normalizedEmail } },
            ],
            trangThai: true,
        },
        include: buildUserInclude,
    })

    if (!user) {
        return null
    }

    const isPasswordValid = await bcrypt.compare(password, user.matKhauHash)
    if (!isPasswordValid) {
        return null
    }

    return user
}

export const registerUser = async ({ name, email, password, phone }) => {
    const normalizedEmail = normalizeEmail(email)

    const existing = await prisma.taiKhoan.findFirst({
        where: {
            OR: [
                { tenDangNhap: normalizedEmail },
                { nhanVien: { email: normalizedEmail } },
            ],
        },
    })

    if (existing) {
        return null
    }

    const chucVu = await ensureDefaultChucVu(prisma)
    const matKhauHash = await bcrypt.hash(password, 10)

    return prisma.$transaction(async (tx) => {
        const nhanVien = await tx.nhanVien.create({
            data: {
                hoTen: name.trim(),
                sdt: phone.trim(),
                email: normalizedEmail,
                diaChi: null,
                avatar: null,
                maChucVu: chucVu.maChucVu,
            },
            include: {
                chucVu: true,
            },
        })

        const taiKhoan = await tx.taiKhoan.create({
            data: {
                tenDangNhap: normalizedEmail,
                matKhauHash,
                trangThai: true,
                preferences: {
                    dark_mode: true,
                    follow_system: true,
                },
                maNhanVien: nhanVien.maNhanVien,
            },
            include: buildUserInclude,
        })

        return taiKhoan
    })
}

export const updateProfile = async (user, updates) => {
    const updateData = {}
    if (Object.hasOwn(updates, 'name')) {
        updateData.hoTen = updates.name.trim()
    }
    if (Object.hasOwn(updates, 'phone')) {
        updateData.sdt = updates.phone.trim()
    }
    if (Object.hasOwn(updates, 'avatar')) {
        updateData.avatar = updates.avatar
    }

    const updatedNhanVien = await prisma.nhanVien.update({
        where: { maNhanVien: user.maNhanVien },
        data: updateData,
    })

    return prisma.taiKhoan.findUnique({
        where: { maTaiKhoan: user.maTaiKhoan },
        include: buildUserInclude,
    }).then((refreshed) => ({
        ...refreshed,
        nhanVien: {
            ...updatedNhanVien,
            chucVu: refreshed?.nhanVien?.chucVu,
        },
    }))
}

export const updateSettings = async (user, settings) => {
    const preferences = user.preferences ? { ...user.preferences } : {}
    Object.assign(preferences, settings)

    return prisma.taiKhoan.update({
        where: { maTaiKhoan: user.maTaiKhoan },
        data: {
            preferences,
        },
        include: buildUserInclude,
    })
}

export const buildUserResponse = (user) => {
    if (!user) {
        return null
    }

    return formatUserResponse(user)
}

export const createAuthToken = signToken
