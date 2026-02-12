import { cartModel } from "../models/carts.model.js"

class CartsDAO {
   // Solo para ver el carrito
   async getByIdPopulated(id) {
      return await cartModel.findById(id).populate("products.product")
   }

   async getById(id) {
      return await cartModel.findById(id)
   }

   async create(cartData) {
      const cart = new cartModel(cartData)
      return await cart.save()
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
