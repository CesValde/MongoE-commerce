import { createMailer } from "../config/mailer.js"
import crypto from "crypto"
import userServices from "../services/users.service.js"

// Send a simple, fixed, plain text email to a recipient.
export const sendMail = async (req, res) => {
   const { email, first_name, _id } = req.user

   try {
      const token = crypto.randomBytes(32).toString("hex")
      const hashedToken = crypto
         .createHash("sha256")
         .update(token)
         .digest("hex")

      await userServices.update(_id, {
         resetPasswordToken: hashedToken,
         resetPasswordExpires: Date.now() + 60 * 60 * 1000 // 1hm
      })

      const resetLink = `http://localhost:8000/api/notify/change-password?token=${token}`
      const transporter = createMailer()

      await transporter.sendMail({
         from: `${process.env.MAIL_USER} "MongoE-commerce"`,
         to: email,
         subject: "Change password",
         text: `Hi ${first_name},

         To change your password, click on the following link:
         ${resetLink}

         If you did not request this change, please ignore this message.`
      })

      res.json({ status: "ok" })
   } catch (error) {
      res.status(500).json({
         status: "error",
         message: "The email could not be sent."
      })
   }
}

// send an email with the purchase confirmation
export const sendBuyConfirmMail = async (user, ticket) => {
   const transporter = createMailer()

   const productsText = ticket.products
      .map(
         (p) =>
            `- ${p.title} | quantity: ${p.quantity} | price: $${p.price} | subtotal: $${p.subtotal}`
      )
      .join("\n")

   await transporter.sendMail({
      from: `${process.env.MAIL_USER} "MongoE-commerce"`,
      to: user.email,
      subject: "Buy successfully!",
      text: `Hi ${user.first_name},

      Your purchase has been successfully processed.

      Your buy:

      Ticket code: ${ticket.code}
      Date: ${ticket.date}
      Total amount: $${ticket.amount}

      Products: ${productsText}

      Thank you for your purchase!.
      `
   })
}
