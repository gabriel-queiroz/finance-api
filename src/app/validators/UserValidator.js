const { body } = require('express-validator')
module.exports = [
  body('first_name', 'Nome do usário não informado').exists(),
  body('last_name', 'Sobrenome do usuário não informado'),
  body('email', 'Email ou senha não informado').exists(),
  body('email', 'Email invalido').isEmail(),
  body('password', 'Email ou senha não informado').exists()
]
