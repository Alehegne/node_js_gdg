import { Router } from "express"
const router = Router()
import { test } from "../controllers/index.js"

router.get("/test", test)

export default router
