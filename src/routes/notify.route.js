import { Router } from "express"
import path from "path"
import { passportCall } from "../middleware/auth.middleware.js"
import * as notifyController from "../controllers/notify.controller.js"

const router = Router()

router.get("/mail", passportCall("jwt"), notifyController.sendMail)

router.get("/change-password", (req, res) => {
   res.sendFile(path.join(process.cwd(), "src/public/html/changePassword.html"))
})

// router.post("/mail", )

export default router
