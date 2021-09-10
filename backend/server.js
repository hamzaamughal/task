import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


const app = express()
app.use(morgan('dev'))

dotenv.config()

connectDB()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('running')
})
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running in Development on port ${PORT} `);
})