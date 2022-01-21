import { Router } from "express"

import UsersController from "./controllers/UsersController.js"
import SessionController from "./controllers/SessionController.js"

const routes = Router()
routes.post('/users', UsersController.create)
routes.post('/auth', SessionController.auth)
routes.post('/session', SessionController.validateToken)

export { routes }