// src/routes/board.routes.js
import { Router } from "express"
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser
} from "../controllers/users.controller.js"

const usersRouter = Router()

usersRouter.get("/", getAllUsers)
usersRouter.get("/:id", getUserById)
usersRouter.post("/", createUser)
usersRouter.put("/:id", updateUser)
usersRouter.delete("/:id", deleteUser)

export default usersRouter
