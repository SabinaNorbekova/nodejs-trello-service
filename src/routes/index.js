import { Router } from "express"

import authRouter from "./auth.routes.js"
import boardsRouter from "./boards.routes.js"
import usersRouter from "./users.routes.js"
import tasksRouter from "./tasks.routes.js"

const mainRouter = Router()

mainRouter.use("/auth", authRouter)
mainRouter.use("/boards", boardsRouter)
mainRouter.use("/users", usersRouter)
mainRouter.use("/boards/:board_id/tasks", (req, res, next) => {
    // parent param (board_id) ni child routerga uzatish uchun
    req.board_id = req.params.board_id
    next()
  }, tasksRouter)
  

export default mainRouter