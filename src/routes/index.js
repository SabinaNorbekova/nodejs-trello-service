import express from "express"
import { Router } from "express"

import boardsRouter from "./boards.routes.js"
import usersRouter from "./users.routes.js"
import tasksRouter from "./tasks.routes.js"

const mainRouter = Router()

mainRouter.use("/boards", boardsRouter)
mainRouter.use("/users", usersRouter)
mainRouter.use("/boards/:board_id/tasks", tasksRouter)

export default mainRouter