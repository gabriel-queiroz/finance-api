const { validationResult } = require('express-validator')

const validate = erros => {
  return async (req, res, next) => {
    await Promise.all(erros.map(erro => erro.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    res.status(400).json({ errors: errors.array() })
  }
}

module.exports = validate
