const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.status(401).send({ error: 'No token provided' })
  }
  const parts = authHeader.split(' ')
  if (!parts === 2) {
    res.status(401).send({ error: 'No Token provided' })
  }
  const [schema, token] = parts
  if (!/^Bearer$/i.test(schema)) {
    res.status(401).send({ error: 'No Token  provided' })
  }
  try {
    const decoded = jwt.verify(token, authConfig.secret)
    req.userId = decoded.id
    return next()
  } catch (error) {
    return res.status(401).send({ error: 'token not valid' })
  }
}

module.exports = auth
