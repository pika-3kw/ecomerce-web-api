const express = require('express')
const productController = require('../controllers/product.controller')

const productRoutes = express.Router()

productRoutes.get('/', productController.getProducts)

productRoutes.get('/:id', productController.getProductById)

productRoutes.post('/', productController.createProduct)

module.exports = productRoutes
