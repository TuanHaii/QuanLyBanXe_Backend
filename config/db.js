import { Pool } from 'pg'
import logger from './logger.js'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

export const connectDB = async () => {
    try {
        const client = await pool.connect()
        logger.info('✅ Connected to PostgreSQL via DATABASE_URL')
        client.release()
        return pool
    } catch (error) {
        logger.error('❌ Database connection failed:', error.message)
        logger.warn('⚠️  Check your DATABASE_URL in .env file')
        return null
    }
}

export const initializeDatabase = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                phone TEXT,
                role TEXT NOT NULL DEFAULT 'user',
                reset_password_token TEXT,
                reset_password_expires TIMESTAMPTZ,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        `)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS cars (
                id TEXT PRIMARY KEY,
                brand TEXT NOT NULL,
                model TEXT NOT NULL,
                category TEXT NOT NULL DEFAULT 'Sedan',
                year INTEGER,
                price NUMERIC(12,2),
                status TEXT NOT NULL DEFAULT 'available',
                stock INTEGER NOT NULL DEFAULT 0,
                rating NUMERIC(3,2) NOT NULL DEFAULT 0,
                image_url TEXT,
                badge_label TEXT,
                badge_color TEXT,
                description TEXT,
                created_by TEXT REFERENCES users(id),
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        `)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS sales (
                id TEXT PRIMARY KEY,
                car_name TEXT NOT NULL,
                car_id TEXT REFERENCES cars(id),
                customer_name TEXT NOT NULL,
                customer_id TEXT,
                customer_phone TEXT,
                customer_email TEXT,
                sale_price NUMERIC(14,2) NOT NULL,
                discount NUMERIC(14,2),
                deposit NUMERIC(14,2),
                sale_date TIMESTAMPTZ NOT NULL,
                notes TEXT,
                status TEXT NOT NULL DEFAULT 'pending',
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        `)

        await pool.query(`
            ALTER TABLE cars ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'Sedan'
        `)
        await pool.query(`
            ALTER TABLE cars ADD COLUMN IF NOT EXISTS stock INTEGER NOT NULL DEFAULT 0
        `)
        await pool.query(`
            ALTER TABLE cars ADD COLUMN IF NOT EXISTS rating NUMERIC(3,2) NOT NULL DEFAULT 0
        `)
        await pool.query(`
            ALTER TABLE cars ADD COLUMN IF NOT EXISTS badge_label TEXT
        `)
        await pool.query(`
            ALTER TABLE cars ADD COLUMN IF NOT EXISTS badge_color TEXT
        `)

        logger.info('✅ Database schema initialized')
    } catch (error) {
        logger.error('❌ Database schema initialization failed:', error.message)
        throw error
    }
}

export default pool
