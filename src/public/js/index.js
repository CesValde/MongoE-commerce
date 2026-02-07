const form = document.querySelector("form")

form.addEventListener("submit", async (event) => {
   event.preventDefault()

   const input1 = document.getElementById("input-1").value
   const input2 = document.getElementById("input-2").value

   console.log(input1)

   console.log("1")

   if (!input1 || !input2) {
      console.log("2")
      alert("Debe completar ambos campos")
      return
   }

   if (input1 === input2) {
      alert("Su contraseña se ha cambiado exitosamente")
      // acá luego hacés el fetch al backend
      const res = await fetch("/api/users/reset-password", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ password: p1 })
      })

      const data = await res.json()

      if (res.ok) {
         alert("Contraseña cambiada")
      } else {
         alert(data.error)
      }
   } else {
      alert("Las contraseñas no coinciden")
   }
})
