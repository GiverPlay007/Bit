import { WebSocketServer } from "ws"

import boardHandler from "./handlers/BoardHandler.js"
import panelHandler from "./handlers/PanelHandler.js"

const createWss = (server) => {
  const boardServer = new WebSocketServer({ server, path: '/board' })
  const panelServer = new WebSocketServer({ server, path: '/panel' })

  boardServer.on('connection', boardHandler.onConnection)
  panelServer.on('connection', panelHandler.onConnection)

  console.log('WebSocket server running!')
  return { boardServer, panelServer }
}

export { createWss }