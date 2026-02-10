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

   async create(user) {
      return await userModel.create(user)
   }

   async update(id, data, options) {
      return await userModel.findByIdAndUpdate(id, data, options)
   }

   async delete(id) {
      return await userModel.findByIdAndDelete(id)
   }

   async getByResetToken(token) {
      return await userModel
         .findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
         })
         .select("+password")
   }
}

export default new UsersDAO()
