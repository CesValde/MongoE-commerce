import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cookieParser from "cookie-parser"

import path from "path"
import { fileURLToPath } from "url"

// imports routes
import userRouter from "./routes/users.route.js"
import authUserRouter from "./routes/authUser.route.js"
import sessionRouter from "./routes/session.route.js"
import notifyRouter from "./routes/notify.route.js"
import productsRouter from "./routes/products.route.js"
import cartsRouter from "./routes/carts.route.js"
import ticketRouter from "./routes/tickets.route.js"

// config server
import { connectAtlasMongoDB } from "./config/auth.config.js"

import { initializePassport } from "./config/passport.config.js"
import passport from "passport"

// filename toma el directorio del archivo ej: C:\Entrega2\src\app.js
// dirname toma la carpeta del directorio del archivo ej: C:\proyectos\miapp\src
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 1234

// app.set("views", path.join(__dirname, "views"))

// Para uso de cookies
app.use(cookieParser(process.env.COOKIE_SECRET))

// Para servir archivos estaticos en http
app.use(express.static(path.join(__dirname, "public")))

// middleware para poder trabajar con datos JSON
app.use(express.json())

initializePassport()

// Inicializa Passport en cada request
app.use(passport.initialize())

async function startServer() {
   try {
      await connectAtlasMongoDB()

      // rutas
      app.use("/auth/user", authUserRouter)
      app.use("/api/users", userRouter)
      app.use("/api/session", sessionRouter)
      app.use("/api/notify", notifyRouter)
      app.use("/api/products", productsRouter)
      app.use("/api/carts", cartsRouter)
      app.use("/api/tickets", ticketRouter)

      app.listen(PORT, () => console.log(`Entrega1 http://localhost:${PORT}`))
   } catch (err) {
      console.error(`Error conectando a MongoDB: ${err}`)
   }
}

startServer()

// para probar el server noma
app.get("/", (req, res) => {
   res.send("home")
})
