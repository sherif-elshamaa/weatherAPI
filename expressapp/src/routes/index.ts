import express from 'express'
import authRouters from './api/auth.routes'
import weatherRoutes from './api/weather.routes'

const routes = express.Router()
routes.use('/auth', authRouters)
routes.use('/', weatherRoutes)

export default routes
