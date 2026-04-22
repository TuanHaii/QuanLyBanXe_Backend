import { Prisma } from '@prisma/client'

import { mapCar } from '../models/carModel.js'
import prisma from './prismaClient.js'

const normalizeId = (id) => {
    const parsed = Number(id)
    return Number.isFinite(parsed) ? parsed : id
}

const includeRelations = {
    hangXe: true,
    loaiXe: true,
}

const buildCarData = (data) => ({
    tenXe: data.tenXe,
    giaBan: new Prisma.Decimal(data.giaBan),
    namSanXuat: Number(data.namSanXuat),
    mauSac: data.mauSac,
    soKhung: data.soKhung,
    soMay: data.soMay,
    dungTich: data.dungTich ?? null,
    soLuongTon: Number(data.soLuongTon ?? 0),
    trangThai: Boolean(data.trangThai),
    maHang: Number(data.maHang),
    maLoaiXe: Number(data.maLoaiXe),
})

export const getCars = async () => {
    const cars = await prisma.xe.findMany({
        include: includeRelations,
        orderBy: { maXe: 'desc' },
    })

    return cars.map((car) => mapCar(car))
}

export const getCarById = async (id) => {
    const normalizedId = normalizeId(id)
    const car = await prisma.xe.findUnique({
        where: { maXe: normalizedId },
        include: includeRelations,
    })
    return car ? mapCar(car) : null
}

export const createCar = async (data) => {
    const newCar = await prisma.xe.create({
        data: buildCarData(data),
        include: includeRelations,
    })

    return mapCar(newCar)
}

export const updateCar = async (id, updates) => {
    const normalizedId = normalizeId(id)
    const car = await prisma.xe.findUnique({
        where: { maXe: normalizedId },
        include: includeRelations,
    })
    if (!car) {
        return null
    }

    const updateData = {}
    if (Object.hasOwn(updates, 'tenXe')) {
        updateData.tenXe = updates.tenXe
    }
    if (Object.hasOwn(updates, 'giaBan')) {
        updateData.giaBan = new Prisma.Decimal(updates.giaBan)
    }
    if (Object.hasOwn(updates, 'namSanXuat')) {
        updateData.namSanXuat = Number(updates.namSanXuat)
    }
    if (Object.hasOwn(updates, 'mauSac')) {
        updateData.mauSac = updates.mauSac
    }
    if (Object.hasOwn(updates, 'soKhung')) {
        updateData.soKhung = updates.soKhung
    }
    if (Object.hasOwn(updates, 'soMay')) {
        updateData.soMay = updates.soMay
    }
    if (Object.hasOwn(updates, 'dungTich')) {
        updateData.dungTich = updates.dungTich
    }
    if (Object.hasOwn(updates, 'soLuongTon')) {
        updateData.soLuongTon = Number(updates.soLuongTon)
    }
    if (Object.hasOwn(updates, 'trangThai')) {
        updateData.trangThai = Boolean(updates.trangThai)
    }
    if (Object.hasOwn(updates, 'maHang')) {
        updateData.maHang = Number(updates.maHang)
    }
    if (Object.hasOwn(updates, 'maLoaiXe')) {
        updateData.maLoaiXe = Number(updates.maLoaiXe)
    }

    const updated = await prisma.xe.update({
        where: { maXe: normalizedId },
        data: updateData,
        include: includeRelations,
    })

    return mapCar(updated)
}

export const deleteCar = async (id) => {
    const normalizedId = normalizeId(id)
    await prisma.xe.delete({ where: { maXe: normalizedId } })
    return true
}
