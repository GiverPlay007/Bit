import prisma from "../database/index.js"

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

export { expireDate }