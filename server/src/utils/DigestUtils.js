import crypto from "crypto"

const sha256 = (source) => {
  return crypto.createHash("sha256").update(source).digest("hex");
}

const randomToken = (user) => {
  return crypto.createHash("sha256").update(`${user}:${Date.now()}`).digest("hex")
}

export { sha256, randomToken }