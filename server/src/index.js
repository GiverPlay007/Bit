import "dotenv/config"

import { server } from "./server.js"

import prisma from "./database/index.js"
import { wss } from "./websocket_server.js"

prisma.$connect().then(() => console.log("Database connected"))
server.listen(process.env.PORT || 3000, () => console.log("Server started"))

const websocketServer = wss(server)
