class TicketDTO {
   static fromDB(ticket) {
      if (!ticket) return null

      return {
         code: ticket.code,
         date: ticket.purchase_datetime,
         amount: ticket.amount,
         purchaser: ticket.purchaser,
         products: ticket.products.map((p) => ({
            title: p.title,
            quantity: p.quantity,
            price: p.price,
            subtotal: p.price * p.quantity
         }))
      }
   }
}

export default TicketDTO
