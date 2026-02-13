import { Router } from "express"
import { passportCall, authorization } from "../middleware/auth.middleware.js"
import * as ticketController from "../controllers/tickets.controller.js"

const router = Router()

router.get(
   "/",
   passportCall("current"),
   authorization("admin"),
   ticketController.getAllTickets
)

router.get(
   "/:tid",
   passportCall("current"),
   authorization("admin"),
   ticketController.getTicketById
)

router.get(
   "/code/:code",
   passportCall("current"),
   authorization("admin"),
   ticketController.getTicketByCode
)

// Complete shopping cart purchase and generate receipt
router.post(
   "/:cid/purchase",
   passportCall("current"),
   ticketController.purchaseCart
)

export default router
