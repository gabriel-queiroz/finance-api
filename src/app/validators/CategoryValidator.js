const { body } = require('express-validator')
const { CategoryTypes } = require('../models/CategoryModel')

module.exports = [
  body('name', 'Nome da categoria não informado').exists(),
  body('description', 'Descrição da categoria não informado').exists(),
  body('type').custom((value, { req }) => {
    if (!CategoryTypes.includes(value)) {
      throw new Error('Tipo de lançamento inválido')
    }
    return true
  })
]
