// src/routes/boards.routes.js
import { Router } from "express"
import { verifyToken } from "../middleware/auth.middleware.js"
import { boardController } from "../controllers/boards.controller.js"
//import { createBoardSchema } from "../validation/boards.validation.js"
import { checkBoardExists, checkBoardOwner } from "../middleware/boards.middleware.js"
import { validateBody } from "../validation/validation.middleware.js"
import { createBoardSchema, updateBoardSchema } from "../validation/boards.validation.js"
const boardsRouter = Router()

boardsRouter.get("/", verifyToken, boardController.getAll)
boardsRouter.get("/:id", verifyToken, checkBoardExists, checkBoardOwner, boardController.getById)
boardsRouter.post("/", verifyToken, validateBody(createBoardSchema), boardController.create)
boardsRouter.put("/:id", verifyToken, checkBoardExists, checkBoardOwner, validateBody(updateBoardSchema), boardController.update)
boardsRouter.delete("/:id", verifyToken, checkBoardExists, checkBoardOwner, boardController.remove)

export default boardsRouter
