import { WebSocketServer } from "ws"
import { getBoard } from "./providers/BoardProvider.js"

const onMessage = (ws, data) => {
  console.log(`Message: ${data}`)
}

const onError = (ws, error) => {
  console.error(`Error: ${error}`)
}

const onConnection = async (ws, req) => {
  const board = await getBoard(req.headers['token'])
  
  if(!board) {
    ws.send(401)
    return ws.close()
  }

  ws.on('message', onMessage)
  ws.on('error', onError)
  console.log("New client!")
}

const createWss = (server) => {
  const websocketServer = new WebSocketServer({ server })

  websocketServer.on('connection', onConnection)

  console.log('WebSocket server running!')
  return websocketServer
}

export { createWss }