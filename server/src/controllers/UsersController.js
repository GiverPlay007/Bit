import prisma from "../database/index.js"

const create = async (req, res) => {
  const { username, password } = req.body

  if(!username) {
    return res.status(400).json({ error: "Username is required" })
  }

  if(!password) {
    return res.status(400).json({ error: "Password is required" })
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
      password
    }
  })

  delete user.password

  return res.status(201).json({ user })
}

export default { create }
