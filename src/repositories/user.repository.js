import userDAO from "../daos/user.dao.js"
import userDTO from "../dtos/user.dto.js"

class UserRepository {
   async getAll() {
      const users = await userDAO.getAll()
      return users.map(userDTO.fromDB)
   }

   async getById(id) {
      const user = await userDAO.getById(id)
      return userDTO.fromDB(user)
   }

   async getByEmail(email) {
      return userDAO.getByEmail(email) // password solo para auth
   }

   async create(data) {
      const userToCreate = userDTO.toDB(data)
      const createdUser = await userDAO.create(userToCreate)
      return userDTO.fromDB(createdUser)
   }

   async update(id, data, options) {
      const updatedUser = await userDAO.update(id, data, options)
      return userDTO.fromDB(updatedUser)
   }

   async delete(id) {
      return userDAO.delete(id)
   }
}

export default new UserRepository()
