const mongoose = require('mongoose')

const CategoryTypes = ['EXPENSE', 'RECIPE']

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  icon: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: CategoryTypes
  }
})

const CategoryModel = mongoose.model('Category', CategorySchema)

module.exports = { CategoryModel, CategoryTypes }
