// src/routes/board.routes.js
import { Router } from "express"

import {
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    createTask
} from "../controllers/tasks.controller.js"

const tasksRouter = Router({ mergeParams: true })

tasksRouter.get("/", getAllTasks)
tasksRouter.get("/:task_id", getTaskById)
tasksRouter.post("/", createTask)
tasksRouter.put("/:task_id", updateTask)
tasksRouter.delete("/:task_id", deleteTask)

export default tasksRouter
