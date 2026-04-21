import {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
} from '../services/carService.js'
import { successResponse } from '../utils/apiResponse.js'

export const listCars = async (req, res, next) => {
    try {
        const cars = await getAllCars()
        return successResponse(res, cars, 'Cars loaded successfully')
    } catch (error) {
        next(error)
    }
}

export const getCar = async (req, res, next) => {
    try {
        const car = await getCarById(req.params.id)
        return successResponse(res, car, 'Car details loaded')
    } catch (error) {
        next(error)
    }
}

export const createCarHandler = async (req, res, next) => {
    try {
        const car = await createCar(req.body, req.user.id)
        return successResponse(res, car, 'Car created successfully')
    } catch (error) {
        next(error)
    }
}

export const updateCarHandler = async (req, res, next) => {
    try {
        const car = await updateCar(req.params.id, req.body)
        return successResponse(res, car, 'Car updated successfully')
    } catch (error) {
        next(error)
    }
}

export const deleteCarHandler = async (req, res, next) => {
    try {
        const payload = await deleteCar(req.params.id)
        return successResponse(res, payload, 'Car deleted successfully')
    } catch (error) {
        next(error)
    }
}
