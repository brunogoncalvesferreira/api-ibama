import express from 'express'
import cors from 'cors'
import { routes } from './routes/routes.js'
import { AppError } from './utils/app-error.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: ['https://upload-ibama.vercel.app/', 'http://localhost:5173'],
    credentials: true,
  }),
)

app.use(routes)

// Tratamento de erro middleware
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

app.listen(8080, () => {
  console.log('server running on port 8080')
})
