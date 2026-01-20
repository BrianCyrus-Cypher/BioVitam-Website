import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import contactRoutes from './routes/contact.js'

dotenv.config()

const app: Express = express()
const port = process.env.BACKEND_PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Biovitam Backend is running' })
})

// Routes
app.use('/contact', contactRoutes)

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err)
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  })
})

app.listen(port, () => {
  console.log(`🌱 Biovitam Backend running at http://localhost:${port}`)
})
