import "dotenv/config"

import { app } from "./app.js"
import { createWss } from "./WebsocketServer.js"
import { createServer } from "http"

import prisma from "./database/index.js"

prisma.$connect().then(() => console.log("Database connected"))

const server = createServer(app)
const wss = createWss(server)

server.listen(process.env.PORT || 3000, () => console.log("Server started"))