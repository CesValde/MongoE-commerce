import ticketsDAO from "../daos/ticket.dao.js"

class TicketsRepository {
   async getAll() {
      return await ticketsDAO.getAll()
   }

   async getById(id) {
      return await ticketsDAO.getById(id)
   }

   async getByCode(code) {
      return await ticketsDAO.getByCode(code)
   }

   async create(data) {
      return await ticketsDAO.create(data)
   }
}

export default new TicketsRepository()
