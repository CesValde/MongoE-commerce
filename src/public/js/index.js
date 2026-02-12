const form = document.querySelector("form")

form.addEventListener("submit", async (event) => {
   event.preventDefault()

   const input1 = document.getElementById("input-1").value
   const input2 = document.getElementById("input-2").value

   if (!input1 || !input2) {
      alert("You must complete both fields.")
      return
   }

   if (input1 !== input2) {
      alert("Passwords do not match")
      return
   }

   const params = new URLSearchParams(window.location.search)
   const token = params.get("token")

   if (!token) {
      alert("Invalid or non-existent token")
      return
   }

   const res = await fetch(
      `http://localhost:8000/api/users/reset-password/${token}`,
      {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ password: input1 })
      }
   )

   const data = await res.json()

   if (!res.ok) {
      alert(data.error || "Error changing password")
      return
   }

   alert("Password successfully changed")
})
