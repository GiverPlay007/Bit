const onConnection = async (ws, req) => {
  const token = req.headers['X-Auth']

  if(!token) {
    ws.send('401: Unauthorized')
    return ws.close()
  }
  
  // TODO: Perform token authentication

  ws.on('message', onMessage)
  ws.on('error', onError)

  console.log("New Panel Client!")
}

const onMessage = (ws, data) => {
  console.log(`Panel WebSocket Message: ${data}`)
}

const onError = (ws, error) => {
  console.error(`Panel WebSocket Error: ${error}`)
}

export default { onConnection, onMessage, onError }