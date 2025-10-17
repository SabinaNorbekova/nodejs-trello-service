// src/routes/boards.routes.js
import { verifyToken } from "../middleware/auth.middleware.js";
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
boardsRouter.get("/:id", verifyToken, getBoardById)
boardsRouter.post("/", verifyToken, createBoard)
boardsRouter.put("/:id", verifyToken, updateBoard)
boardsRouter.delete("/:id", verifyToken, deleteBoard)
export default boardsRouter
