const { body } = require('express-validator')
const { TransactionTypes } = require('../models/TransactionModel.js')
module.exports = [
  body('createdAt', 'A data deve ser no padrão ISO8601 ')
    .isISO8601()
    .optional(),
  body('description', 'Descrição do lançamento não informado').exists(),
  body('value', 'Valor do lançamento não informado').exists(),
  body('value', 'Valor do lançamento não é um número valido').isFloat(),
  body('type', 'tipo do lançamento não informado').exists(),
  body('type').custom((value, { req }) => {
    if (!TransactionTypes.includes(value)) {
      throw new Error('Tipo de lançamento inválido')
    }
    return true
  }),
  body('account', 'id de conta não é valido').isMongoId(),
  body('category', 'id de categoria não é valido').isMongoId()
]
