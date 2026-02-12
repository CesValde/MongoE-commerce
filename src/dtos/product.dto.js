class ProductDTO {
   static fromDB(product) {
      if (!product) return null

      return {
         id: product._id.toString(),
         title: product.title,
         description: product.description,
         code: product.code,
         price: product.price,
         category: product.category,
      }
   }
}

export default ProductDTO