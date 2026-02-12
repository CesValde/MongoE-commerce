import { Router } from "express"
import { passportCall } from "../middleware/auth.middleware.js"
import * as userController from "../controllers/users.controller.js"

const router = Router()

router.get("/", passportCall("current"), userController.getAllUsers)

router.get("/:uid", passportCall("current"), userController.getUserById)

router.post("/", passportCall("current"), userController.saveUser)

router.post("/reset-password/:token", userController.resetPassword)

router.put("/:uid", passportCall("current"), userController.updateUser)

router.delete("/:uid", passportCall("current"), userController.deleteUser)

export default router
