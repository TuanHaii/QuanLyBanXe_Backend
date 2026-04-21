import 'dotenv/config'
import express from 'express'
import logger from './config/logger.js'
import { connectDB, initializeDatabase } from './config/db.js'
import apiRouter from './src/routes/index.js'
import { errorHandler } from './src/middlewares/errorHandler.js'

const app = express()
const port = process.env.APP_PORT || 3000

app.use(express.json())
app.use('/api', apiRouter)

app.get('/', (req, res) => {
    res.json({ status: 'OK', message: 'BE_QLBX backend is running' })
})

const startServer = async () => {
    const db = await connectDB()
    if (!db) {
        logger.error('Unable to start server because database connection failed.')
        process.exit(1)
    }

    await initializeDatabase()

    app.use(errorHandler)

    app.listen(port, () => {
        logger.info(`Server is listening on port ${port}`)
    })
}

startServer()
