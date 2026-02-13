import cartRepository from "../repositories/cart.repository.js"
import userRepository from "../repositories/user.repository.js"
import productsServices from "./products.service.js"
import AppError from "../error/error.js"

class CartService {
   async getOrCreateCartForUser(uid) {
      try {
         const user = await userRepository.getById(uid)
         if (!user) throw new AppError("User not found", 404)

         if (user.cart) {
            const cartId = user.cart._id ?? user.cart
            return await cartRepository.getByIdByPopulated(cartId)
         }

         const cart = await cartRepository.create({
            user: uid,
            products: []
         })

         await userRepository.update(uid, { cart: cart._id })

         return cart
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async addProductToCart(uid, productId, quantity = 1) {
      try {
         const cart = await this.getOrCreateCartForUser(uid)
         const product = await productsServices.getById(productId)

         if (product.stock < quantity || product.status === false) {
            throw new AppError("Out of stock", 409)
         }

         const existingProduct = cart.products.find(
            (p) =>
               (p.product._id?.toString() ?? p.product.toString()) === productId
         )

         if (existingProduct) {
            existingProduct.quantity += quantity
         } else {
            cart.products.push({ product: productId, quantity })
         }

         return await cartRepository.update(cart._id, {
            products: cart.products
         })
      } catch (error) {
         console.log(error)
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async removeProductFromCart(userId, productId) {
      try {
         const cart = await this.getOrCreateCartForUser(userId)

         // to use with or without populate
         cart.products = cart.products.filter((p) =>
            p.product._id
               ? p.product._id.toString() !== productId
               : p.product.toString() !== productId
         )

         return await cartRepository.update(cart._id, {
            products: cart.products
         })
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async clearCart(userId) {
      try {
         const cart = await this.getOrCreateCartForUser(userId)
         cart.products = []
         return await cartRepository.update(cart._id, { products: [] })
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }
}

export default new CartService()
