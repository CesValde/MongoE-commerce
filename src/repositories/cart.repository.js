import cartsDAO from "../daos/cart.dao.js"

class CartRepository {
   async getAll() {
      return await cartsDAO.getAll()
   }

   // only to show the user
   async getByIdByPopulated(id) {
      return await cartsDAO.getByIdByPopulated(id)
   }

   async getById(id) {
      return await cartsDAO.getById(id)
   }

   async create(cartData) {
      return await cartsDAO.create(cartData)
   }

   async update(id, updateData) {
      return await cartsDAO.update(id, updateData)
   }

   async delete(id) {
      return await cartsDAO.delete(id)
   }
}

export default new CartRepository()
