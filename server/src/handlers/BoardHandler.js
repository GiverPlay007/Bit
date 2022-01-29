import { getBoard } from "../providers/BoardProvider.js"

const onConnection = async (ws, req) => {
  const board = await getBoard(req.headers['X-Auth'])
  
  if(!board) {
    ws.send(401)
    return ws.close()
  }

  ws.on('message', onMessage)
  ws.on('error', onError)
  
  console.log("New Board Client!")
}

const onMessage = (ws, data) => {
  console.log(`Board WebSocket Message: ${data}`)
}

const onError = (ws, error) => {
  console.error(`Board WebSocket Error: ${error}`)
}

export default { onConnection, onMessage, onError }