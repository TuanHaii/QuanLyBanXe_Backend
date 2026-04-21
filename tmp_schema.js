import 'dotenv/config'
import pool from './config/db.js'

const run = async () => {
    const result = await pool.query("SELECT column_name,data_type FROM information_schema.columns WHERE table_name='cars' ORDER BY ordinal_position")
    console.log(JSON.stringify(result.rows, null, 2))
    process.exit(0)
}

run()

