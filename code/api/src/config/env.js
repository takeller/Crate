// Imports
import dotenv from 'dotenv'

// Load .env
dotenv.config()

// Environment
export const NODE_ENV = process.env.NODE_ENV

// Port
// npm start from api folder hosts on port 8000
export const PORT = process.env.PORT || 8000
