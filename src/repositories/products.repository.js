import productDAO from "../daos/product.dao.js"
// import productDTO from "../dtos/product.dto.js"

class ProductRepository {
   async paginate(filter, options) {
      return productDAO.paginate(filter, options)
   }

   async getById(id) {
      const product = await productDAO.getById(id)
      return product
   }

   async getById(id) {
      return productDAO.getById(id)
   }

   async create(data) {
      const createdUser = await productDAO.create(data)
      return createdUser
   }

   async update(id, data, options) {
      const updatedUser = await productDAO.update(id, data, options)
      return updatedUser
   }

   async delete(id) {
      const deleteUser = productDAO.delete(id)
      return deleteUser
   }
}

export default new ProductRepository()
