// Import required modules
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()
connectDB()
const app = express()

const PORT = process.env.PORT || 4000

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Middleware to parse JSON and cookies
app.use(express.json({ limit: '50mb' })) // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })) // To parse form data in the req.body
app.use(cookieParser())
// Middleware for CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  // Allow credentials (cookies) to be sent cross-origin
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

// Routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
