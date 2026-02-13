import { cartModel } from "../models/carts.model.js"

class CartsDAO {
   // only to show the user
   async getByIdByPopulated(id) {
      return await cartModel.findById(id).populate("products.product")
   }

   async getAll() {
      return await cartModel.find()
   }

   async getById(id) {
      return await cartModel.findById(id)
   }

   async create(cartData) {
      return await cartModel.create(cartData)
   }

   async update(id, updateData) {
      return await cartModel.findByIdAndUpdate(id, updateData, {
         new: true,
         runValidators: true
      })
   }

   async delete(id) {
      return await cartModel.findByIdAndDelete(id)
   }
}

export default new CartsDAO()
