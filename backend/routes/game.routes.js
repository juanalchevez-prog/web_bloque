import { Router } from "express"
import { getGameUser, putGamePoints } from "../controllers/game.controllers.js"

const router = Router()

router.get("/game/:id", getGameUser)
router.put("/game/:id", putGamePoints)

export default router
