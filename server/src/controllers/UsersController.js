import prisma from "../database/index.js"

const create = async (req, res) => {
  const data = await prisma.user.create({
    data: {
      username: "giverzinho",
      password: "a7b6f1"
    }
  })

  return res.json({
    success: true,
    data
  })
}

export default { create }