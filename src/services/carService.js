import { v4 as uuidv4 } from 'uuid'
import pool from '../../config/db.js'
import { mapCar } from '../models/carModel.js'
import { notFound, badRequest } from '../utils/apiError.js'

export const getAllCars = async ({ category, query } = {}) => {
    const conditions = []
    const values = []
    let index = 1

    if (category) {
        conditions.push(`category = $${index}`)
        values.push(category)
        index += 1
    }

    if (query) {
        conditions.push(`(brand ILIKE $${index} OR model ILIKE $${index} OR description ILIKE $${index})`)
        values.push(`%${query}%`)
        index += 1
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
    const result = await pool.query(`SELECT * FROM cars ${where} ORDER BY created_at DESC`, values)
    return result.rows.map(mapCar)
}

export const getCarById = async (id) => {
    const result = await pool.query('SELECT * FROM cars WHERE id = $1 LIMIT 1', [id])
    if (result.rows.length === 0) {
        throw notFound('Car not found')
    }
    return mapCar(result.rows[0])
}

export const createCar = async (
    {
        brand,
        model,
        category,
        year,
        price,
        status,
        stock,
        rating,
        imageUrl,
        badgeLabel,
        badgeColor,
        description,
    },
    createdBy,
) => {
    if (!brand || !model) {
        throw badRequest('Brand and model are required')
    }

    const id = uuidv4()
    const now = new Date().toISOString()
    const query = `INSERT INTO cars (
      id, brand, model, category, year, price, status,
      stock, rating, image_url, badge_label, badge_color,
      description, created_by, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
     RETURNING *`
    const values = [
        id,
        brand.trim(),
        model.trim(),
        category || 'Sedan',
        year || null,
        price || null,
        status || 'available',
        stock ?? 0,
        rating ?? 0,
        imageUrl || null,
        badgeLabel || null,
        badgeColor || null,
        description || null,
        createdBy,
        now,
        now,
    ]
    const result = await pool.query(query, values)

    return mapCar(result.rows[0])
}

export const updateCar = async (id, updates) => {
    const allowedFields = [
        'brand',
        'model',
        'category',
        'year',
        'price',
        'status',
        'stock',
        'rating',
        'imageUrl',
        'badgeLabel',
        'badgeColor',
        'description',
    ]
    const fields = Object.keys(updates).filter((field) => allowedFields.includes(field))
    if (fields.length === 0) {
        throw badRequest('No valid fields provided for car update')
    }

    const existingCar = await pool.query('SELECT * FROM cars WHERE id = $1 LIMIT 1', [id])
    if (existingCar.rows.length === 0) {
        throw notFound('Car not found')
    }

    const setStatements = []
    const values = []
    let index = 1

    fields.forEach((field) => {
        const column = field === 'imageUrl'
            ? 'image_url'
            : field === 'badgeLabel'
                ? 'badge_label'
                : field === 'badgeColor'
                    ? 'badge_color'
                    : field === 'carId'
                        ? 'car_id'
                        : field

        values.push(updates[field] ?? null)
        setStatements.push(`${column} = $${index}`)
        index += 1
    })

    values.push(new Date().toISOString())
    values.push(id)

    const result = await pool.query(
        `UPDATE cars SET ${setStatements.join(', ')}, updated_at = $${index} WHERE id = $${index + 1} RETURNING *`,
        values,
    )

    return mapCar(result.rows[0])
}

export const deleteCar = async (id) => {
    const result = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) {
        throw notFound('Car not found')
    }
    return { message: 'Car deleted successfully' }
}
