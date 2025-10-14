// src/routes/board.routes.js
import { Router } from "express"
import {taskController} from "../controllers/tasks.controller.js"

const tasksRouter = Router({ mergeParams: true })

tasksRouter.get("/", taskController.getAll)
tasksRouter.get("/:task_id", taskController.getById)
tasksRouter.post("/", taskController.create)
tasksRouter.put("/:task_id", taskController.update)
tasksRouter.delete("/:task_id", taskController.remove)

export default tasksRouter
