// src/routes/board.routes.js
import { Router } from "express"
import {userController} from "../controllers/users.controller.js"

const usersRouter = Router()

usersRouter.get("/", userController.getAll)
usersRouter.get("/:id", userController.getById)
usersRouter.post("/", userController.create)
usersRouter.put("/:id", userController.update)
usersRouter.delete("/:id", userController.remove)

export default usersRouter
