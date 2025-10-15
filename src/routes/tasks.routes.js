// src/routes/tasks.routes.js
import { Router } from "express"
import { taskController } from "../controllers/tasks.controller.js"
import { createTaskSchema } from "../validation/tasks.validation.js"
import { createBoardSchema } from "../validation/boards.validation.js"
import { verifyToken } from "../middleware/auth.middleware.js"
import { checkTaskExists, checkTaskOwner } from "../middleware/tasks.middleware.js"

const tasksRouter = Router({ mergeParams: true })

tasksRouter.get("/", verifyToken, taskController.getAll)
tasksRouter.get("/:task_id", verifyToken, checkTaskExists, checkTaskOwner, taskController.getById)
tasksRouter.post("/", verifyToken, taskController.create)
tasksRouter.put("/:task_id", verifyToken, checkTaskExists, checkTaskOwner, taskController.update)
tasksRouter.delete("/:task_id", verifyToken, checkTaskExists, checkTaskOwner, taskController.remove)

export default tasksRouter
