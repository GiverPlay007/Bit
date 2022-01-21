import prisma from "../database/index.js"
import { randomToken, sha256 } from "../utils/DigestUtils.js"

const doAuth = async (username, password) => {
  const user = await prisma.user.findFirst({
    where: { username }
  })

  if(!user) {
    throw "User is not registered"
  }

  if(user.password !== sha256(password)) {
    throw "Wrong password"
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

  return token
}

const expireDate = async (token) => {
  const session = await prisma.session.findFirst({
    where: { token }
  })

  if(!session) {
    throw "Invalid token"
  }

  if(session.expire <= Date.now()) {
    await prisma.session.delete({ where: { id: session.id } })

    throw "Session expired"
  }

  return session.expire
}

export { expireDate, doAuth }