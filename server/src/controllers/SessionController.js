import { doAuth, expireDate } from "../providers/SessionProvider.js"

const auth = async (req, res) => {
  const { username, password } = req.body

  if(!username || !password) {
    const requestsBody = [
      username ? username : "username-required",
      password ? password : "password-required"
    ]

    for(let i = 0; i < requestsBody.length; i++) {
      if(requestsBody[i].includes("required")) {
        return res.status(400).json({
          error: `${requestsBody[i].split('-')[0]} is required`
        })
      }
    }
  }

  try {
    const token = await doAuth(username, password)
    return res.status(202).json({ token })
  } catch(error) {
    return res.status(401).json({ error })
  }
}

const validateToken = async (req, res) => {
  const { token } = req.body

  if(!token) {
    return res.status(400).json({ error: "Missing token" })
  }

  try {
    const expire = await expireDate(token)
    return res.status(200).json({ expire })
  } catch(error) {
    return res.status(401).json({ error })
  }
}

export default { auth, validateToken }