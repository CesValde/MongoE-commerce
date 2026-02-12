import { Router } from "express"
import { passportCall } from "../middleware/auth.middleware.js"
import * as cartsController from "../controllers/carts.controller.js"

const router = Router()

router.get("/", passportCall("current"), cartsController.getCart)

router.post("/", passportCall("current"), cartsController.addProduct)

router.delete(
   "/product/:pid",
   passportCall("current"),
   cartsController.removeProduct
)

router.delete("/", passportCall("current"), cartsController.clearCart)

export default router
