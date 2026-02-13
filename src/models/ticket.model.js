import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema({
   code: {
      type: String,
      unique: true,
      required: true
   },
   purchase_datetime: {
      type: Date,
      default: Date.now
   },
   purchaser: {
      type: String,
      required: true
   },
   amount: {
      type: Number,
      required: true
   },
   products: [
      {
         title: { type: String, required: true },
         quantity: { type: Number, required: true },
         price: { type: Number, required: true }
      }
   ]
})

export const ticketModel = mongoose.model("tickets", ticketSchema)
