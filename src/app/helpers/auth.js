const authConfig = require('../../config/auth.json')
const jwt = require('jsonwebtoken')

const generateToken = params => {
  return jwt.sign(params, authConfig.secret, { expiresIn: 86400 })
}

module.exports = generateToken
