import prisma from "../database/index.js"
import { randomToken, sha256 } from "../utils/DigestUtils.js"

const auth = async (req, res) => {
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

  const user = await prisma.user.findFirst({
    where: { username }
  })

  if(!user) {
    return res.status(401).json({ error: "User not registered" })
  }

  if(user.password !== sha256(password)) {
    return res.status(401).json({ error: "Wrong password" })
  }

  const token = randomToken(user.username)

  await prisma.session.create({
    data: {
      token,
      expire: new Date(Date.now() + 3600000).toISOString(),
      user: {
        connect: {
          id: user.id
        }
      }
    }
  })

  return res.status(202).json({ token })
}

export default { auth }