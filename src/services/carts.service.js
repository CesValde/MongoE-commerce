import cartRepository from "../repositories/cart.repository.js"
import userRepository from "../repositories/user.repository.js"
import productsServices, { ProductServices } from "./products.service.js"
import AppError from "../error/error.js"

class CartService {
   async getOrCreateCartForUser(uid) {
      const user = await userRepository.getById(uid)
      if (!user) throw new AppError("User not found", 404)

      if (user.cart) {
         const cartId = user.cart._id ?? user.cart
         return await cartRepository.getById(cartId)
      }

      const cart = await cartRepository.create({
         user: uid,
         products: []
      })

      await userRepository.update(uid, { cart: cart._id })

      return cart
   }

   async addProductToCart(uid, productId, quantity = 1) {
      const cart = await this.getOrCreateCartForUser(uid)
      const product = await productsServices.getById(productId)

      if (product.stock < quantity || product.status === false) {
         throw new AppError("Out of stock", 409)
      }

      const existingProduct = cart.products.find(
         (p) => p.product.toString() === productId
      )

      if (existingProduct) {
         existingProduct.quantity += quantity

         // hacer esto cuando se hace la venta
         const stock = product.stock - quantity

         if (stock === 0) {
            const status = (product.status = false)
            const data = {
               stock,
               status
            }
            await productsServices.update(productId, data)
         }
      } else {
         cart.products.push({ product: productId, quantity })
      }

      return await cartRepository.update(cart._id, {
         products: cart.products
      })
   }

   async removeProductFromCart(userId, productId) {
      const cart = await this.getOrCreateCartForUser(userId)

      cart.products = cart.products.filter(
         (p) => p.product.toString() !== productId
      )

      return await cartRepository.update(cart._id, { products: cart.products })
   }

   async clearCart(userId) {
      const cart = await this.getOrCreateCartForUser(userId)
      cart.products = []
      return await cartRepository.update(cart._id, { products: [] })
   }
}

export default new CartService()
