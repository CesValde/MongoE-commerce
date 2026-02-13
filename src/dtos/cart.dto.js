class CartDTO {
   static fromDB(cart) {
      return {
         products: cart.products.map((item) => ({
            id: item.product._id,
            title: item.product.title,
            price: item.product.price,
            quantity: item.quantity,
            subtotal: item.product.price * item.quantity
         })),
         total: cart.products.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
         )
      }
   }
}

export default CartDTO
