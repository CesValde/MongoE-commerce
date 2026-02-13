import crypto from "crypto"
import ticketsRepository from "../repositories/ticket.repository.js"
import productsService from "./products.service.js"
import AppError from "../error/error.js"

class TicketService {
   async getAll() {
      try {
         return await ticketsRepository.getAll()
      } catch (error) {
         throw new AppError("Database error", 500)
      }
   }

   async getById(tid) {
      try {
         const ticket = await ticketsRepository.getById(tid)

         if (!ticket) {
            throw new AppError("Ticket not found", 404)
         }

         return ticket
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async getByCode(code) {
      try {
         const ticket = await ticketsRepository.getByCode(code)

         if (!ticket) {
            throw new AppError("Ticket not found", 404)
         }

         return ticket
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async purchaseCart(cart, user) {
      try {
         let amount = 0
         const ticketProducts = []

         if (cart.products.length === 0) {
            throw new AppError("Cart is empty", 404)
         }

         for (const item of cart.products) {
            const product = await productsService.getById(item.product)

            if (!product) {
               throw new AppError("Product not found", 404)
            }

            const newStock = product.stock - item.quantity

            if (newStock < 0) {
               throw new AppError(`Not enough stock for ${product.title}`, 400)
            }

            await productsService.update(product._id, {
               stock: newStock,
               status: newStock > 0
            })

            amount += product.price * item.quantity

            ticketProducts.push({
               title: product.title,
               quantity: item.quantity,
               price: product.price
            })
         }

         const ticket = await ticketsRepository.create({
            code: crypto.randomUUID(),
            amount,
            purchaser: user.email,
            purchase_datetime: new Date(),
            products: ticketProducts
         })

         return ticket
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }
}

export default new TicketService()
