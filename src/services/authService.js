import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import pool from '../../config/db.js'
import { notFound, badRequest, conflict, unauthorized } from '../utils/apiError.js'
import { mapUser, sanitizeUser } from '../models/userModel.js'

const jwtSecret = process.env.JWT_SECRET || 'change_me'
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '24h'

const createToken = (payload) => jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn })

export const registerUser = async ({ name, email, password, phone }) => {
    if (!name || !email || !password || !phone) {
        throw badRequest('Missing required registration fields')
    }

    const normalizedEmail = email.trim().toLowerCase()
    const existingUser = await findUserByEmail(normalizedEmail)
    if (existingUser) {
        throw conflict('Email is already registered')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const id = uuidv4()
    const now = new Date().toISOString()

    const result = await pool.query(
        `INSERT INTO users (id, name, email, password, phone, role, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $7)
     RETURNING *`,
        [id, name.trim(), normalizedEmail, hashedPassword, phone.trim(), 'user', now],
    )

    const user = mapUser(result.rows[0])
    const token = createToken({ userId: user.id })
    return { token, user }
}

export const loginUser = async ({ email, password }) => {
    if (!email || !password) {
        throw badRequest('Email and password are required')
    }

    const normalizedEmail = email.trim().toLowerCase()
    const userRow = await findUserByEmail(normalizedEmail)
    if (!userRow) {
        throw unauthorized('Invalid email or password')
    }

    const passwordMatches = await bcrypt.compare(password, userRow.password)
    if (!passwordMatches) {
        throw unauthorized('Invalid email or password')
    }

    const user = mapUser(userRow)
    const token = createToken({ userId: user.id })
    return { token, user }
}

export const verifyAuthToken = async (token) => {
    try {
        const decoded = jwt.verify(token, jwtSecret)
        if (!decoded || typeof decoded !== 'object' || !decoded.userId) {
            throw unauthorized('Invalid token payload')
        }

        const user = await findUserById(decoded.userId)
        if (!user) {
            throw unauthorized('User not found for token')
        }

        return user
    } catch (error) {
        throw unauthorized(error.message || 'Unauthorized')
    }
}

export const getUserProfile = async (userId) => {
    const user = await findUserById(userId)
    if (!user) {
        throw notFound('User not found')
    }
    return sanitizeUser(user)
}

export const updateUserProfile = async (userId, updates) => {
    const allowedFields = ['name', 'phone', 'email']
    const fields = Object.keys(updates).filter((field) => allowedFields.includes(field))
    if (fields.length === 0) {
        throw badRequest('No valid fields provided for profile update')
    }

    const existingUser = await findUserById(userId)
    if (!existingUser) {
        throw notFound('User not found')
    }

    if (updates.email && updates.email.trim().toLowerCase() !== existingUser.email) {
        const emailTaken = await findUserByEmail(updates.email.trim().toLowerCase())
        if (emailTaken) {
            throw conflict('Email is already in use')
        }
    }

    const values = []
    const setStatements = []
    let index = 1
    fields.forEach((field) => {
        if (field === 'email') {
            values.push(updates.email.trim().toLowerCase())
        } else {
            values.push(updates[field].trim())
        }
        setStatements.push(`${field} = $${index}`)
        index += 1
    })
    values.push(new Date().toISOString())
    values.push(userId)

    const result = await pool.query(
        `UPDATE users SET ${setStatements.join(', ')}, updated_at = $${index} WHERE id = $${index + 1} RETURNING *`,
        values,
    )

    return sanitizeUser(result.rows[0])
}

export const forgotPassword = async (email) => {
    if (!email) {
        throw badRequest('Email is required')
    }

    const normalizedEmail = email.trim().toLowerCase()
    const user = await findUserByEmail(normalizedEmail)
    if (!user) {
        return { message: 'If the email is registered, a reset link has been sent' }
    }

    const resetToken = crypto.randomBytes(24).toString('hex')
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60).toISOString()

    await pool.query(
        'UPDATE users SET reset_password_token = $1, reset_password_expires = $2, updated_at = $3 WHERE id = $4',
        [resetToken, expiresAt, new Date().toISOString(), user.id],
    )

    return {
        message: 'If the email is registered, a reset link has been sent',
        resetToken,
    }
}

export const resetPassword = async ({ token, password }) => {
    if (!token || !password) {
        throw badRequest('Token and password are required')
    }

    const result = await pool.query(
        'SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expires >= $2 LIMIT 1',
        [token, new Date().toISOString()],
    )

    if (result.rows.length === 0) {
        throw badRequest('Reset token is invalid or expired')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await pool.query(
        'UPDATE users SET password = $1, reset_password_token = NULL, reset_password_expires = NULL, updated_at = $2 WHERE id = $3',
        [hashedPassword, new Date().toISOString(), result.rows[0].id],
    )

    return { message: 'Password has been reset successfully' }
}

export const findUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email])
    return result.rows[0] || null
}

export const findUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [id])
    return result.rows[0] || null
}

export const logoutUser = async () => {
    return { message: 'Logout successful' }
}
