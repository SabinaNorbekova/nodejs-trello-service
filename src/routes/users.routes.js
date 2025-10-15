// src/routes/users.routes.js
import { Router } from "express"
import { userController } from "../controllers/users.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js"
import { checkUserAccess, checkUserExists } from "../middleware/users.middleware.js"

const usersRouter = Router()

usersRouter.get("/", userController.getAll)
usersRouter.get("/:id", verifyToken, checkUserExists, checkUserAccess, userController.getById)
usersRouter.post("/", verifyToken, userController.create)
usersRouter.put("/:id", verifyToken, checkUserExists, checkUserAccess, userController.update)
usersRouter.delete("/:id", verifyToken, checkUserExists, checkUserAccess, userController.remove)

export default usersRouter
