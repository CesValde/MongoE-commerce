import CartDTO from "../dtos/cart.dto.js"
import cartService from "../services/carts.service.js"

export const getCart = async (req, res) => {
   try {
      const user = req.user
      const cart = await cartService.getOrCreateCartForUser(user._id)
      const productsCart = CartDTO.fromDB(cart)

      return res.status(200).json(productsCart)
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.message || "Internal server error"
      })
   }
}

export const addProduct = async (req, res) => {
   try {
      const user = req.user
      const { pid, quantity } = req.body
      const cart = await cartService.addProductToCart(user._id, pid, quantity)
      return res.status(200).json(cart)
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.message || "Internal server error"
      })
   }
}

export const removeProduct = async (req, res) => {
   try {
      const { pid } = req.params
      const cart = await cartService.removeProductFromCart(req.user._id, pid)
      return res.status(200).json(cart)
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.message || "Internal server error"
      })
   }
}

export const clearCart = async (req, res) => {
   try {
      const cart = await cartService.clearCart(req.user._id)
      return res.status(200).json(cart)
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.message || "Internal server error"
      })
   }
}
