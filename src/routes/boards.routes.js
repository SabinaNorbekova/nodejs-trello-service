// src/routes/board.routes.js
import { Router } from "express";
import {
    getBoards,
    getBoardById,
    createBoard,
    updateBoard,
    deleteBoard,
} from "../controllers/boards.controller.js";

const boardsRouter = Router();

boardsRouter.get("/", getBoards);
boardsRouter.get("/:id", getBoardById);
boardsRouter.post("/", createBoard);
boardsRouter.put("/:id", updateBoard);
boardsRouter.delete("/:id", deleteBoard);

export default boardsRouter;
