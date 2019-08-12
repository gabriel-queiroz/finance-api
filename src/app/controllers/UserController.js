const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const auth = require('../helpers/auth')

class UserController {
  async store (req, res) {
    try {
      let { body: user } = req
      const { email } = user
      if (await UserModel.findOne({ email })) {
        return res.status(400).send({ error: 'already exists user with email' })
      }
      user = await UserModel.create(user)
      return res.send(user)
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  async authenticate (req, res) {
    try {
      const { email, password } = req.body
      const user = await UserModel.findOne({ email }).select('+password')
      if (!user) {
        return res.status(400).send({ error: 'Email or password not found' })
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).send({ error: 'Invalid dates' })
      }
      user.password = undefined
      const token = auth({ id: user.id })
      return res.send({
        user,
        token
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}

module.exports = new UserController()
