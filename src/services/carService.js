import { cars } from './dataStore.js'
import { randomUUID } from 'crypto'

export const getCars = () => {
    return [...cars]
}

export const getCarById = (id) => {
    return cars.find((car) => car.id === id)
}

export const createCar = (data) => {
    const newCar = {
        id: randomUUID(),
        ...data,
        status: data.status || 'available',
        images: data.images || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
    cars.push(newCar)
    return newCar
}

export const updateCar = (id, updates) => {
    const car = cars.find((item) => item.id === id)
    if (!car) {
        return null
    }
    Object.assign(car, updates, { updated_at: new Date().toISOString() })
    return car
}

export const deleteCar = (id) => {
    const index = cars.findIndex((item) => item.id === id)
    if (index === -1) {
        return false
    }
    cars.splice(index, 1)
    return true
}
