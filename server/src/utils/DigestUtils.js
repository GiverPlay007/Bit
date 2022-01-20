import crypto from "crypto"

const sha256 = (source) => {
  return crypto.createHash("sha256").update(source).digest("hex");
}

export { sha256 }