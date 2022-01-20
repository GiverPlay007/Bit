import prisma from "../database/index.js"
import { sha256 } from "../utils/DigestUtils.js"

const create = async (req, res) => {
  const { username, password } = req.body

  if(!username || !password) {
    const requestsBody = [
      username ? username : "username-required",
      password ? password : "password-required"
    ]
    for(let i = 0; i < requestsBody.length; i++) {
      if(requestsBody[i].includes("required")) {
        return res.status(400).json({
          error: `${requestsBody[i].split('-')[0]} is required`
        })
      }
    }
  }

  const registered = await prisma.user.findFirst({
    where: { username }
  })

  if(registered) {
    return res.status(409).json({ error: "User already registered" })
  }

  const user = await prisma.user.create({
    data: {
      username,
      password: sha256(password)
    }
  })

  delete user.password

  return res.status(201).json({ user })
}

export default { create }
