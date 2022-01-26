import websocket from "ws"

const onMessage = (ws, data) => {
  console.log(`Message: ${data}`)
}

const onError = (ws, error) => {
  console.error(`Error: ${error}`)
}

const onConnection = (ws, req) => {
  ws.on('message', onMessage)
  ws.on('error', onError)
  console.log("New client!")
}

const wss = (server) => {
  const websocketServer = new websocket.Server({ server })
  websocketServer.on('connection', onConnection)

  console.log('WebSocket server running!')
  return websocketServer
}

export { wss }