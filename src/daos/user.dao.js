import { userModel } from "../models/user.model.js"

class UsersDAO {
   async getAll() {
      return await userModel.find()
   }

   async getByEmail(email) {
      return await userModel.findOne({ email }).select("+password")
   }

   async getById(id) {
      return await userModel.findById(id)
   }

   async create(users) {
      return await userModel.insertMany(users)
   }

   async update(id, data, options) {
      return await userModel.findByIdAndUpdate(id, data, options)
   }

   async delete(id) {
      return await userModel.findByIdAndDelete(id)
      // await usersDAO.deleteOne({ _id: id })
   }
}

export default new UsersDAO()
