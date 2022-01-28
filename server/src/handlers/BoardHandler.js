const onMessage = (ws, data) => {
  console.log(`Message: ${data}`)
}

const onError = (ws, error) => {
  console.error(`Error: ${error}`)
}

export default { onMessage, onError }