import express from "express"
import { routes } from "./routes.js"

const app = express()

const errorHandler = (error, req, res, next) => {
  if(error instanceof SyntaxError) {
    return res.status(400).json({ error: "Invalid JSON body" })
  }

  next()
}

app.use(express.json())
app.use(errorHandler)

app.use(routes)

export { app }