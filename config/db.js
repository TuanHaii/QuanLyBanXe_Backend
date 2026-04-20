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

export default pool
