const express = require('express')
const productController = require('../controllers/product.controller')

const router = express.Router()

router.get(/^\/$/, productController.list)
router.get('/:id', productController.get)
router.post('/', productController.create)
router.put('/:id', productController.update)
router.delete('/:id', productController.delete)
router.get('/get/count', productController.count)

module.exports = router
