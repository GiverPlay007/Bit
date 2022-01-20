import express from "express"
import { routes } from "./routes.js"

const server = express()

const errorHandler = (error, req, res, next) => {
  if(error instanceof SyntaxError) {
    return res.status(400).json({ error: "Invalid JSON body" })
  }

  next()
}

server.use(express.json())
server.use(errorHandler)

server.use(routes)

export { server }