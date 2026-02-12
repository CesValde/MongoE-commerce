import mongoose from "mongoose"
import AppError from "../error/error.js"
import productsRepository from "../repositories/products.repository.js"
import ProductDTO from "../dtos/product.dto.js"

export class ProductServices {
   // Obtiene los productos de la base de datos
   async getAll(queryParams = {}) {
      try {
         const {
            limit = 10,
            page = 1,
            category,
            status,
            query,
            sort
         } = queryParams

         const filter = {}

         // filtra sea mayus o minus
         if (category)
            filter.category = { $regex: `^${category}$`, $options: "i" }
         if (status !== undefined) filter.status = status === "true"

         if (query) {
            filter.$or = [
               { title: { $regex: query, $options: "i" } },
               { description: { $regex: query, $options: "i" } },
               { category: { $regex: query, $options: "i" } }
            ]
         }

         // evalua las opciones y filtra por precio si esta en la url
         const options = {
            page: Number(page),
            limit: Number(limit),
            lean: true,
            sort:
               sort === "asc"
                  ? { price: 1 }
                  : sort === "desc"
                    ? { price: -1 }
                    : {}
         }

         const result = await productsRepository.paginate(filter, options)

         return {
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage
         }
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   // retorna un producto en base a su id
   async getById(pid) {
      try {
         if (!mongoose.Types.ObjectId.isValid(pid)) {
            throw new AppError(`Invalid product ${pid} format`, 404)
         }

         const product = await productsRepository.getById(pid)
         if (!product) {
            throw new AppError(`Product with id ${pid} not found`, 404)
         }

         return product
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   // agrega un objeto producto nuevo a la colección
   async create(product) {
      try {
         const {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
         } = product

         if (
            !title ||
            !description ||
            !code ||
            !price ||
            !status ||
            !stock ||
            !category ||
            !thumbnails
         ) {
            throw new AppError("Missing values", 400)
         }

         const productTocreate = {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
         }

         return await productsRepository.create(productTocreate)
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   // modifica un producto
   async update(pid, data) {
      try {
         if (!mongoose.Types.ObjectId.isValid(pid)) {
            throw new AppError("Invalid product ID format", 400)
         }

         if (!data || Object.keys(data).length === 0) {
            throw new AppError("No data to update", 400)
         }

         const productReplace = await productsRepository.update(pid, data, {
            new: true,
            runValidators: true
         })

         if (!productReplace) {
            throw new AppError("Product not found", 404)
         }

         return productReplace
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }

   // elimina un producto
   async delete(pid) {
      try {
         if (!mongoose.Types.ObjectId.isValid(pid)) {
            throw new AppError("Invalid product ID format", 400)
         }

         const product = await productsRepository.delete(pid)
         if (!product) {
            throw new AppError("Product not found", 404)
         }

         return product
      } catch (error) {
         if (error instanceof AppError) throw error
         throw new AppError("Database error", 500)
      }
   }
}

export default new ProductServices()
