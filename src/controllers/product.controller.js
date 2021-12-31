const Product = require('../models/product.model')

exports.getProducts = async (req, res) => {
  const products = await Product.find()
  res.json(products)
}

exports.getProductById = async (req, res) => {
  const { id } = req.params
  const product = await Product.find({ id })
  res.json(product)
}

exports.createProduct = async (req, res) => {
  const { name } = req.body
  const product = new Product({
    name,
  })

  await product.save()

  res.json(product)
}
