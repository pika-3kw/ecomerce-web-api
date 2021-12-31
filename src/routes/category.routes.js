const express = require('express')
const categoryController = require('../controllers/category.controller')

const router = express.Router()

router.get(/^\/$/, categoryController.list)
router.get('/:id', categoryController.get)
router.post('/', categoryController.create)
router.put('/:id', categoryController.update)
router.delete('/:id', categoryController.delete)

module.exports = router
