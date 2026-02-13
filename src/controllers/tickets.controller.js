import ticketsService from "../services/tickets.service.js"
import cartsService from "../services/carts.service.js"
import TicketDTO from "../dtos/ticket.dto.js"
import { sendBuyConfirmMail } from "../controllers/notify.controller.js"

export const getAllTickets = async (req, res) => {
   try {
      const tickets = await ticketsService.getAll()
      return res.status(200).json(tickets.map(TicketDTO.fromDB))
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const getTicketById = async (req, res) => {
   const { tid } = req.params

   try {
      const ticket = await ticketsService.getById(tid)
      return res.status(200).json(TicketDTO.fromDB(ticket))
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const getTicketByCode = async (req, res) => {
   const { code } = req.params

   try {
      const ticket = await ticketsService.getByCode(code)
      return res.status(200).json(ticket)
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const purchaseCart = async (req, res) => {
   try {
      const user = req.user
      const cart = await cartsService.getOrCreateCartForUser(user._id)
      const ticket = await ticketsService.purchaseCart(cart, user)

      const ticketToUser = TicketDTO.fromDB(ticket)
      try {
         await sendBuyConfirmMail(user, ticketToUser)
         await cartsService.clearCart(user._id)
      } catch (error) {
         throw new AppError("Error sending confirmation email:", 500)
      }

      res.json({
         status: "success",
         ...ticketToUser
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}
