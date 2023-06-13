import { Router } from 'express'
import { createUser, login } from '../../controllers/auth.controller'
const routes = Router()

routes.post('/create', createUser)
routes.get('/login', login)
export default routes
