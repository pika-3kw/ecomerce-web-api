const _ = require('lodash')

const Product = require('../models/product.model')

const getProductFilterFromQuery = (query) => {
  let filter = {}

  if (query.categories) {
    filter = _.assign({}, filter, {
      category: query.categories,
    })
  }
  if (query.isFeatured) {
    filter = _.assign({}, filter, {
      isFeatured: query.isFeatured,
    })
  }

  return filter
}

const getProductSortFromQuery = (query) => {
  if (!query.sort) {
    return
  }
  return query.sort.replace(/\,/, ' ').trim()
}

exports.list = async (req, res) => {
  const filter = getProductFilterFromQuery(req.query)
  const sort = getProductSortFromQuery(req.query)

  const totalResults = await Product.countDocuments(filter)

  const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1
  const resultsPerPage =
    parseInt(req.query.resultsPerPage) > 0
      ? parseInt(req.query.resultsPerPage)
      : totalResults

  const products = await Product.find(filter)
    .sort(sort)
    .skip((page - 1) * resultsPerPage)
    .limit(resultsPerPage)
    .populate('category')

  res.json({
    content: products,
    page,
    resultsPerPage,
    totalResults,
  })
}

exports.get = async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id).populate('category')
  res.json(product)
}

exports.create = async (req, res) => {
  const product = new Product(req.body)

  try {
    await product.save()
    res.json(product)
  } catch (error) {
    res.json(error)
  }
}

exports.update = async (req, res) => {
  const { id } = req.params
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true })
  res.json(product)
}

exports.delete = async (req, res) => {
  const { id } = req.params
  const product = await Product.findByIdAndDelete(id)
  res.json(product)
}

exports.count = async (req, res) => {
  const productCount = await Product.countDocuments()
  res.json({ count: productCount })
}
