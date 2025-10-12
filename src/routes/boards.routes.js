// src/routes/board.routes.js
import { Router } from "express"
import {
    getAllBoards,
    getBoardById,
    createBoard,
    updateBoard,
    deleteBoard,
} from "../controllers/boards.controller.js"

const boardsRouter = Router()

boardsRouter.get("/", getAllBoards)
boardsRouter.get("/:id", getBoardById)
boardsRouter.post("/", createBoard)
boardsRouter.put("/:id", updateBoard)
boardsRouter.delete("/:id", deleteBoard)

export default boardsRouter
