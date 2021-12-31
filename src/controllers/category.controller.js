const Category = require('../models/category.model')

exports.list = async (req, res) => {
  const categories = await Category.find()
  res.json(categories)
}

exports.get = async (req, res) => {
  const { id } = req.params
  const category = await Category.findById(id)
  res.json(category)
}

exports.create = async (req, res) => {
  const category = new Category(req.body)
  await category.save()
  res.json(category)
}

exports.update = async (req, res) => {
  const { id } = req.params
  const category = await Category.findByIdAndUpdate(id, req.body, { new: true })
  res.json(category)
}

exports.delete = async (req, res) => {
  const { id } = req.params
  const category = await Category.findByIdAndDelete(id)
  res.json(category)
}
