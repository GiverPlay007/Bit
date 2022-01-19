import "dotenv/config"

import { server } from "./server.js"

import prisma from "./database/index.js"

const start = async () => {
  await prisma.$connect()
  console.log("Connected to database")
  server.listen(process.env.PORT || 3000, () => console.log("Server started"))
}

start()