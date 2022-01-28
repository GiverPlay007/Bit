import { WebSocketServer } from "ws"
import { getBoard } from "./providers/BoardProvider.js"

import boardHandler from "./handlers/BoardHandler.js"

const onConnection = async (ws, req) => {
  const board = await getBoard(req.headers['token'])
  
  if(!board) {
    ws.send(401)
    return ws.close()
  }

  ws.on('message', boardHandler.onMessage)
  ws.on('error', boardHandler.onError)
  console.log("New client!")
}

const createWss = (server) => {
  const websocketServer = new WebSocketServer({ server })

  websocketServer.on('connection', onConnection)

  console.log('WebSocket server running!')
  return websocketServer
}

export { createWss }