import {
    createCar,
    deleteCar,
    getCarById,
    getCars,
    updateCar,
} from '../services/carService.js'
import { errorResponse, successResponse } from '../utils/apiResponse.js'

export const listCars = async (req, res, next) => {
    try {
        return successResponse(res, await getCars(), 'Danh sách xe')
    } catch (error) {
        next(error)
    }
}

export const getCarDetail = async (req, res, next) => {
    try {
        const car = await getCarById(req.params.id)
        if (!car) {
            return errorResponse(res, 404, 'Xe không tồn tại')
        }
        return successResponse(res, car, 'Chi tiết xe')
    } catch (error) {
        next(error)
    }
}

export const createCarController = async (req, res, next) => {
    try {
        const car = await createCar(req.body)
        return successResponse(res, car, 'Xe đã được thêm')
    } catch (error) {
        next(error)
    }
}

export const updateCarController = async (req, res, next) => {
    try {
        const updatedCar = await updateCar(req.params.id, req.body)
        if (!updatedCar) {
            return errorResponse(res, 404, 'Xe không tồn tại')
        }
        return successResponse(res, updatedCar, 'Xe đã được cập nhật')
    } catch (error) {
        next(error)
    }
}

export const deleteCarController = async (req, res, next) => {
    try {
        const deleted = await deleteCar(req.params.id)
        if (!deleted) {
            return errorResponse(res, 404, 'Xe không tồn tại')
        }
        return successResponse(res, null, 'Xe đã được xóa')
    } catch (error) {
        next(error)
    }
}
