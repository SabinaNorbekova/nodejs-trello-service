// src/controllers/users.controller.js
import baseController from "./base.controller.js"
const userController = new baseController("users")


userController.getAll = userController.getAll.bind(userController)
userController.getById = userController.getById.bind(userController)
userController.create = userController.create.bind(userController)
userController.update = userController.update.bind(userController)
userController.remove = userController.remove.bind(userController)

export { userController }
