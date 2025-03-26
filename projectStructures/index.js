import express, { json, urlencoded } from "express"
import routes from "./src/routes/index.js"
import dotenv from "dotenv"
import process from "node:process"
import { logger } from "./src/utils/logger.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(logger)

app.use("/api", routes)

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
