import prisma from "../database/index.js"

const create = async (req, res) => {
  const { username, password } = req.body

  const user = await prisma.user.create({
    data: {
      username,
      password
    }
  })

  return res.status(201).json(user)
}

export default { create }
