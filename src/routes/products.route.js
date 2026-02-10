import { Router } from "express"
import { authorization, passportCall } from "../middleware/auth.middleware.js"
import * as productsController from "../controllers/products.controller.js"

const router = Router()

router.get(
   "/",
   passportCall("jwt"),
   authorization("user"),
   productsController.getAllProducts
)

router.get(
   "/:pid",
   passportCall("jwt"),
   authorization("user"),
   productsController.getProductById
)

router.post(
   "/",
   passportCall("jwt"),
   authorization("admin"),
   productsController.saveProduct
)

router.put(
   "/:pid",
   passportCall("jwt"),
   authorization("admin"),
   productsController.updateProduct
)

router.delete(
   "/:pid",
   passportCall("jwt"),
   authorization("admin"),
   productsController.deleteProduct
)

export default router