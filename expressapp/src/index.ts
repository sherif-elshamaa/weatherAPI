import express, { Application, Request, Response } from 'express'
import config from './config'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import routes from './routes/index'
import errorMiddleware from './middlewares/error.middleware'
import connectDB from './database/db.config'

const PORT = config.port

const app: Application = express()
connectDB()

app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200
  })
)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'requests limit exceded'
  })
)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my API')
})

app.use('/api', routes)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

export default app
