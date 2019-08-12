const { CategoryModel } = require('../models/CategoryModel')
const ObjectId = require('mongoose').Types.ObjectId

class CategoryController {
  async store (req, res) {
    let { body: category, userId: user } = req
    try {
      category = await CategoryModel.create({ ...category, user })
      return res.send(category)
    } catch (error) {
      return res.status(400).send(error)
    }
  }
  async listAll (req, res) {
    const expense = await CategoryModel.find({ type: 'EXPENSE' })
    const recipe = await CategoryModel.find({ type: 'RECIPE' })
    return res.send({ expense, recipe })
  }
  async update (req, res) {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Id invalido' })
    }
    try {
      let { body: category } = req
      const response = await CategoryModel.findByIdAndUpdate(id, category)
      if (response == null) {
        return res.status(400).send({ error: 'Category not found' })
      }
      return res.status(204).send(response)
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}

module.exports = new CategoryController()
