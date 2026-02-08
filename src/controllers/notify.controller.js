import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import { createMailer } from "../config/mailer.js"
import crypto from "crypto"
import userServices from "../services/users.service.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const readTemplate = (nameTemplate) => {
   const p = path.join(__dirname, "..", "templates", nameTemplate)
   return fs.readFileSync(p, "utf-8")
}

// Envía un email simple, fijo y de texto plano a un destinatario hardcodeado.
export const sendMail = async (req, res) => {
   const { email, first_name, id } = req.user

   try {
      const token = crypto.randomBytes(32).toString("hex")
      const hashedToken = crypto
         .createHash("sha256")
         .update(token)
         .digest("hex")

      await userServices.update(id, {
         resetPasswordToken: hashedToken,
         resetPasswordExpires: Date.now() + 60 * 60 * 1000 // 1h
         //resetPasswordExpires: Date.now() + 2 * 60 * 1000 // 2m
      })

      const resetLink = `http://localhost:8000/api/notify/change-password/${token}`
      const transporter = createMailer()

      const info = await transporter.sendMail({
         from: `${process.env.MAIL_USER} "MongoE-commerce"`,
         to: email,
         subject: "Change password",
         text: `Hi ${first_name},

         To change your password, click on the following link:
         ${resetLink}

         If you did not request this change, please ignore this message.`
      })

      console.log("Message send:", info.messageId)
      res.json({ status: "ok" })
   } catch (error) {
      console.error({ error })
      res.status(500).json({
         status: "error",
         message: "The email could not be sent."
      })
   }
}

/*
// later see if i use it
export const sendMailBuyConfirm = async (req, res) => {
   const { to, name = "cliente", product = "Producto" } = req.body

   try {
      if (!to) {
         return res
            .status(400)
            .json({ error: "El destinatario es Obligatorio" })
      }

      const htmlBase = readTemplate("purchase.html")
         .replaceAll("{{NOMBRE}}", name)
         .replaceAll("{{PRODUCTO}}", product)

      const transporter = createMailer()
      const info = await transporter.sendMail({
         from: `${process.env.MAIL_USER} "MongoE-commerce"`,
         to: to,
         subject: `Confirmación de Compra ${product}`,
         html: htmlBase
         attachments: [
            {
               filename: "logo.png",
               path: path.join(__dirname, "..", "..", "assets", "logo.png"),
               cid: "logo_cid"
            },
            {
               filename: "manual.pdf",
               path: path.join(__dirname, "..", "..", "assets", "apunte.pdf")
            }
         ] 
      })
      console.log("Mensaje Enviado:", info.messageId)
      res.json({ status: "ok" })
   } catch (error) {
      console.error({ error })
      res.status(500).json({
         status: "error",
         message: "No se pudo enviar el Mail"
      })
   }
}

*/
