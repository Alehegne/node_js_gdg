import { getTestMessage } from "../services/index.js"

export const test = (req, res) => {
  const message = getTestMessage()
  res.status(200).json({ message })
}
