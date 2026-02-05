// dtos/user.dto.js
class UserDTO {
   static fromDB(user) {
      if (!user) return null

      return {
         id: user._id.toString(),
         fullName: `${user.first_name} ${user.last_name}`,
         email: user.email,
         age: user.age,
         role: user.role
      }
   }

   static toDB(data) {
      return {
         first_name: data.firstName,
         last_name: data.lastName,
         email: data.email,
         password: data.password,
         age: data.age,
         role: data.role ?? "user"
      }
   }
}
 
export default UserDTO