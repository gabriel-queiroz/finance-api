const { body } = require('express-validator')
module.exports = [
  body('name', 'Nome da conta não informado').exists(),
  body('description', 'Descrição da conta não informado').exists()
]
