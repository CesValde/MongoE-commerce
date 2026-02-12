import productsServices from "../services/products.service.js"
import ProductDTO from "../dtos/product.dto.js"

export const getAllProducts = async (req, res) => {
   try {
      const products = await productsServices.getAll()
      return res.status(200).json(products.map(ProductDTO.fromDB))
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const getProductById = async (req, res) => {
   const { pid } = req.params

   try {
      const product = await productsServices.getById(pid)
      return res.status(200).json(ProductDTO.fromDB(product))
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const saveProduct = async (req, res) => {
   const data = req.body

   try {
      const product = await productsServices.create(data)
      return res.status(201).json({
         message: "Product created successfully",
         product
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const updateProduct = async (req, res) => {
   const { pid } = req.params
   const data = req.body

   try {
      const product = await productsServices.update(pid, data)
      const productDTO = productDTO.fromDB(product)

      return res.status(200).json({
         message: "Product update successfully",
         productDTO
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}

export const deleteProduct = async (req, res) => {
   const { pid } = req.params

   try {
      const product = await productsServices.delete(pid)
      const productDTO = productDTO.fromDB(product)

      return res.status(200).json({
         message: "Product delete successfully",
         productDTO
      })
   } catch (error) {
      return res.status(error.statusCode || 500).json({
         error: error.statusCode ? error.message : "Internal server error"
      })
   }
}
