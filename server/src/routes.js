import { Router } from "express"

import PinsController from "./controllers/PinsController.js"

const routes = Router()
routes.get('/pin', PinsController.pin)

export { routes }