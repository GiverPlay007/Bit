import prisma from "../database/index.js"

const getBoard = async (key) => {
  const board = await prisma.board.findFirst({
    where: { key }
  })

  return board
}

export { getBoard }