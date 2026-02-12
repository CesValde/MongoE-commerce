import productDAO from "../daos/product.dao.js"

class ProductRepository {
   async paginate(filter, options) {
      return await productDAO.paginate(filter, options)
   }

   async getById(id) {
      return await productDAO.getById(id)
   }

   async create(data) {
      return await productDAO.create(data)
   }

   async update(id, data, options) {
      return await productDAO.update(id, data, options)
   }

   async delete(id) {
      return productDAO.delete(id)
   }
}

export default new ProductRepository()
