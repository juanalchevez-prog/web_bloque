import { Router } from "express"
import { hola, ping, abc, marco } from "../controllers/index.controllers.js"

const router = Router()

router.get("/", hola)
router.get("/ping", ping)
router.get("/marco", marco)
router.get("/a/b/c", abc)

export default router
