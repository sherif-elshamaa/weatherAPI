import { Router } from 'express'
import authMiddleware from '../../middlewares/auth.middleware'
import { getWeather } from '../../controllers/weather.controller'

const router = Router()

router.get('/weather/:city', authMiddleware, getWeather)

export default router
