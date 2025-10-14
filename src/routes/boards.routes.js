// src/routes/boards.routes.js
import { Router } from "express"
import { verifyToken } from "../middleware/auth.middleware.js"
import { boardController } from "../controllers/boards.controller.js"

const boardsRouter = Router()

boardsRouter.get("/", verifyToken, boardController.getAll)
boardsRouter.get("/:id", verifyToken, boardController.getById)
boardsRouter.post("/", verifyToken, boardController.create)
boardsRouter.put("/:id", verifyToken, boardController.update)
boardsRouter.delete("/:id", verifyToken, boardController.remove)

export default boardsRouter
