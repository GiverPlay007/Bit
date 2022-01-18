import "dotenv/config"
import { server } from "./server.js"

server.listen(process.env.PORT || 3000, () => console.log("Ligado"))