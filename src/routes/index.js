import express from "express"
import { Router } from "express"

import boardsRouter from "./boards.routes"
import usersRouter from "./users.routes"
import tasksRouter from "./tasks.routes"

const mainRouter = Router()

mainRouter.use("/boards", boardsRouter)
mainRouter.use("users", usersRouter)
mainRouter.use("/boards/:board_id/tasks", tasksRouter)

export default mainRouter