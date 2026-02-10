import userServices from "../services/users.service.js"
import crypto from "crypto"

export const getAllUsers = async (req, res) => {
   try {
      const users = await userServices.getAll()
      return res.status(200).json(users)
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const getUserById = async (req, res) => {
   const { uid } = req.params

   try {
      const user = await userServices.getById(uid)
      return res.status(200).json(user)
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const saveUser = async (req, res) => {
   const data = req.body

   try {
      const user = await userServices.create(data)
      return res.status(201).json({
         message: "User created successfully",
         user
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const updateUser = async (req, res) => {
   const { uid } = req.params
   const data = req.body

   try {
      const user = await userServices.update(uid, data)

      return res.status(200).json({
         message: "User update successfully",
         user
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const resetPassword = async (req, res) => {
   try {
      const { token } = req.params
      const { password } = req.body

      const hashedToken = crypto
         .createHash("sha256")
         .update(token)
         .digest("hex")

      await userServices.resetPassword(hashedToken, password)

      res.json({ message: "Password updated successfully" })
   } catch (error) {
      res.status(error.statusCode || 500).json({
         error: error.message || "Error resetting password"
      })
      console.log(error)
   }
}

export const deleteUser = async (req, res) => {
   const { uid } = req.params

   try {
      const user = await userServices.delete(uid)
      return res.status(200).json({
         message: "User delete successfully",
         user
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}
