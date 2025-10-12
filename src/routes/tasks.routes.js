// src/routes/board.routes.js
import { Router } from "express"
import {
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    createTask
} from "../controllers/tasks.controller.js"

const tasksRouter = Router()

tasksRouter.get("/", getAllTasks)
tasksRouter.get("/:id", getTaskById)
tasksRouter.post("/", createTask)
tasksRouter.put("/:id", updateTask)
tasksRouter.delete("/:id", deleteTask)

export default tasksRouter
