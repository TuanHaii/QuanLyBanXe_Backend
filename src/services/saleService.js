import { v4 as uuidv4 } from 'uuid'
import pool from '../../config/db.js'
import { mapSale } from '../models/saleModel.js'
import { notFound, badRequest } from '../utils/apiError.js'

export const getAllSales = async ({ status, query } = {}) => {
    const conditions = []
    const values = []
    let index = 1

    if (status) {
        conditions.push(`status = $${index}`)
        values.push(status)
        index += 1
    }

    if (query) {
        conditions.push(`(car_name ILIKE $${index} OR customer_name ILIKE $${index} OR customer_phone ILIKE $${index} OR customer_email ILIKE $${index})`)
        values.push(`%${query}%`)
        index += 1
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
    const result = await pool.query(`SELECT * FROM sales ${where} ORDER BY sale_date DESC`, values)
    return result.rows.map(mapSale)
}

export const getSaleById = async (id) => {
    const result = await pool.query('SELECT * FROM sales WHERE id = $1 LIMIT 1', [id])
    if (result.rows.length === 0) {
        throw notFound('Sale not found')
    }
    return mapSale(result.rows[0])
}

export const createSale = async (payload) => {
    const {
        carName,
        carId,
        customerName,
        customerId,
        customerPhone,
        customerEmail,
        salePrice,
        discount,
        deposit,
        saleDate,
        notes,
        status = 'pending',
    } = payload

    if (!carName || !customerName || !salePrice || !saleDate) {
        throw badRequest('carName, customerName, salePrice and saleDate are required')
    }

    const id = uuidv4()
    const now = new Date().toISOString()

    const result = await pool.query(
        `INSERT INTO sales (
      id, car_name, car_id, customer_name, customer_id, customer_phone,
      customer_email, sale_price, discount, deposit, sale_date,
      notes, status, created_at, updated_at
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$14) RETURNING *`,
        [
            id,
            carName.trim(),
            carId || null,
            customerName.trim(),
            customerId || null,
            customerPhone || null,
            customerEmail || null,
            salePrice,
            discount || null,
            deposit || null,
            saleDate,
            notes || null,
            status,
            now,
        ],
    )

    return mapSale(result.rows[0])
}

export const updateSale = async (id, updates) => {
    const allowedFields = [
        'carName',
        'carId',
        'customerName',
        'customerId',
        'customerPhone',
        'customerEmail',
        'salePrice',
        'discount',
        'deposit',
        'saleDate',
        'notes',
        'status',
    ]

    const fields = Object.keys(updates).filter((field) => allowedFields.includes(field))
    if (fields.length === 0) {
        throw badRequest('No valid fields provided for sale update')
    }

    const existing = await pool.query('SELECT * FROM sales WHERE id = $1 LIMIT 1', [id])
    if (existing.rows.length === 0) {
        throw notFound('Sale not found')
    }

    const setStatements = []
    const values = []
    let index = 1

    fields.forEach((field) => {
        const column = field === 'carName'
            ? 'car_name'
            : field === 'customerName'
                ? 'customer_name'
                : field === 'customerPhone'
                    ? 'customer_phone'
                    : field === 'customerEmail'
                        ? 'customer_email'
                        : field === 'salePrice'
                            ? 'sale_price'
                            : field === 'saleDate'
                                ? 'sale_date'
                                : field === 'customerId'
                                    ? 'customer_id'
                                    : field === 'discount'
                                        ? 'discount'
                                        : field === 'deposit'
                                            ? 'deposit'
                                            : field === 'notes'
                                                ? 'notes'
                                                : field === 'status'
                                                    ? 'status'
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
        `UPDATE sales SET ${setStatements.join(', ')}, updated_at = $${index} WHERE id = $${index + 1} RETURNING *`,
        values,
    )

    return mapSale(result.rows[0])
}

export const deleteSale = async (id) => {
    const result = await pool.query('DELETE FROM sales WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) {
        throw notFound('Sale not found')
    }
    return { message: 'Sale deleted successfully' }
}
