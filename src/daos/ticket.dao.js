import { ticketModel } from "../models/ticket.model.js"

class TicketsDAO {
   async getAll() {
      return await ticketModel.find()
   }

   async getById(id) {
      return await ticketModel.findById(id)
   }

   async getByCode(code) {
      return await ticketModel.findOne({ code })
   }

   async create(ticketData) {
      return await ticketModel.create(ticketData)
   }
}

export default new TicketsDAO()
