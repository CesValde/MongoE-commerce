class UserDTO {
   static fromDB(user) {
      if (!user) return null

      return {
         id: user._id.toString(),
         first_name: user.first_name,
         last_name: user.last_name,
         email: user.email,
         age: user.age,
         role: user.role,
         cart: user.cart
      }
   }

   static toDB(data) {
      return {
         first_name: data.first_name,
         last_name: data.last_name,
         email: data.email,
         password: data.password,
         age: data.age,
         role: data.role ?? "user",
         cart: data.cart
      }
   }
}

export default UserDTO
