import { WebSocketServer } from "ws"
import { URL } from 'url'

import boardHandler from "./handlers/BoardHandler.js"
import panelHandler from "./handlers/PanelHandler.js"

const createWss = (server) => {
  const boardServer = new WebSocketServer({ noServer: true })
  const panelServer = new WebSocketServer({ noServer: true })

  boardServer.on('connection', boardHandler.onConnection)
  panelServer.on('connection', panelHandler.onConnection)

  server.on('upgrade', (request, socket, head) => {
    const pathname = request.url
  
    const server = pathname === '/board' ? boardServer : pathname === '/panel' ? panelServer : undefined

    if(!server) {
      return socket.destroy()
    }

    server.handleUpgrade(request, socket, head, ws => server.emit('connection', ws, request))
  })

  boardServer.on('connection', boardHandler.onConnection)
  panelServer.on('connection', panelHandler.onConnection)

  console.log('WebSocket server running!')
  return { boardServer, panelServer }
}

export { createWss }