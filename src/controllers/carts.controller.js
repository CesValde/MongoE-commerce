import cartService from "../services/carts.service.js"

export const getCart = async (req, res) => {
   try {
      const user = req.user
      const cart = await cartService.getOrCreateCartForUser(user._id)
      res.status(200).json(cart)
   } catch (error) {
      res.status(error.statusCode || 500).json({
         error: error.message || "Internal server error"
      })
   }
}

export const addProduct = async (req, res) => {
   try {
      // const pid = req.params
      const user = req.user
      const { pid, quantity } = req.body
      const cart = await cartService.addProductToCart(
         user._id,
         pid,
         quantity
      )
      res.status(200).json(cart)
   } catch (error) {
      res.status(error.statusCode || 500).json({
         error: error.message || "Internal server error"
      })
   }
}

export const removeProduct = async (req, res) => {
   try {
      const { pid } = req.params
      const cart = await cartService.removeProductFromCart(
         req.user._id,
         pid
      )
      res.status(200).json(cart)
   } catch (error) {
      res.status(error.statusCode || 500).json({
         error: error.message || "Internal server error"
      })
   }
}

export const clearCart = async (req, res) => {
   try {
      const cart = await cartService.clearCart(req.user._id)
      res.status(200).json(cart)
   } catch (error) {
      res.status(error.statusCode || 500).json({
         error: error.message || "Internal server error"
      })
   }
}
