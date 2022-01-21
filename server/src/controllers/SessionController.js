import prisma from "../database/index.js"
import { randomToken, sha256 } from "../utils/DigestUtils.js"
import { expireDate } from "../providers/SessionProvider.js"

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

const validateToken = async (req, res) => {
  const { token } = req.body

  if(!token) {
    return res.status(400).json({ error: "Missing token" })
  }

  try {
    const expire = await expireDate(token)
    return res.status(200).json({ expire })
  } catch(error) {
    return res.status(401).json({ error })
  }
}

export default { auth, validateToken }