import { productsModel } from "../models/products.model.js"

class ProductsDAO {
   async paginate(filter, options) {
      return productsModel.paginate(filter, options)
   }

   async getById(id) {
      return await productsModel.findById(id)
   }

   async create(product) {
      return await productsModel.insertOne(product)
   }

   async update(id, data, options) {
      return await productsModel.findByIdAndUpdate(id, data, options)
   }

   async delete(id) {
      return await productsModel.findByIdAndDelete(id)
   }
}

export default new ProductsDAO()
