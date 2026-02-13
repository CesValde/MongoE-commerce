import { Router } from "express"
import path from "path"
import { passportCall } from "../middleware/auth.middleware.js"
import * as notifyController from "../controllers/notify.controller.js"

const router = Router()

router.get("/mail", passportCall("current"), notifyController.sendMail)

// html changePassword
router.get("/change-password", (req, res) => {
   res.sendFile(path.join(process.cwd(), "src/public/html/changePassword.html"))
})

export default router
