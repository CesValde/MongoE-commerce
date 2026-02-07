import userRepository from "../repositories/user.repository.js"
import bcrypt from "bcrypt"
import AppError from "../error/error.js"

class UserServices {
   async getAll() {
      try {
         return await userRepository.getAll()
      } catch (error) {
         throw new AppError("Database error", 500)
      }
   }

   async getByEmail(email) {
      try {
         const user = await userRepository.getByEmail(email) //.select("+password")

         if (!user) {
            throw new AppError("User not found", 404)
         }

         return user
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async getById(id) {
      try {
         const user = await userRepository.getById(id)

         if (!user) {
            throw new AppError("User not found", 404)
         }

         return user
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async create(arr) {
      try {
         for (const user of arr) {
            const { first_name, last_name, email, password, age, role } = user

            if (
               !first_name ||
               !last_name ||
               !email ||
               !password ||
               !age ||
               !role
            ) {
               throw new AppError("Missing values", 400)
            }

            const hash = await bcrypt.hash(password, 10)
            user.password = hash
         }

         const result = await userRepository.create(arr)
         return result
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async update(id, first_name, last_name, email, password, age, role) {
      try {
         const updateData = {}

         if (first_name) updateData.first_name = first_name
         if (last_name) updateData.last_name = last_name
         if (email) updateData.email = email
         if (age) updateData.age = age
         if (role) updateData.role = role

         if (password) {
            updateData.password = await bcrypt.hash(password, 10)
         }

         if (Object.keys(updateData).length === 0) {
            throw new AppError("No data to update", 400)
         }

         const updatedUser = await userRepository.update(id, updateData, {
            new: true,
            runValidators: true
         })

         if (!updatedUser) {
            throw new AppError("User not found", 404)
         }

         return updatedUser
      } catch (error) {
         console.log(error)
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   async delete(id) {
      try {
         const user = await userRepository.delete(id)

         if (!user) {
            throw new AppError("User not found", 404)
         }

         return user
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   // login
   async login(email, password) {
      try {
         if (!email || !password) {
            throw new AppError("Missing values", 400)
         }

         const user = await this.getByEmail(email)

         const isValidPassword = await bcrypt.compare(password, user.password)

         if (!isValidPassword) {
            throw new AppError("incorrect credentials", 400)
         }

         return user
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   // reset password
   async resetPassword(id, hash) {
      try {
         console.log(2)

         const updatedUser = await userRepository.update(
            id,
            { password: hash },
            { new: true, runValidators: true }
         )

         if (!updatedUser) {
            throw new AppError("User not found", 404)
         }

         console.log(updatedUser)

         return updatedUser
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }
}

export default new UserServices()
