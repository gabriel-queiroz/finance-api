const AccountModel = require('../models/AccountModel')
const ObjectId = require('mongoose').Types.ObjectId

class AccountController {
  async store (req, res) {
    let { body: account, userId: user } = req
    try {
      account = await AccountModel.create({ ...account, user })
      return res.send(account)
    } catch (error) {
      return res.status(400).send(error)
    }
  }
  async listAll (req, res) {
    const result = await AccountModel.aggregate([
      {
        $lookup: {
          from: 'transactions',
          localField: '_id',
          foreignField: 'account',
          as: 'transactions'
        }
      },
      {
        $project: {
          value: { $sum: '$transactions.value' },
          name: '$name',
          description: '$description'
        }
      }
    ])
    return res.status(200).send(result)
  }
  async update (req, res) {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Id invalido' })
    }
    let { body: account } = req
    const response = await AccountModel.findByIdAndUpdate(id, account)
    if (response == null) {
      return res.status(400).send({ error: 'Account not found' })
    }
    return res.status(204).send()
  }
}

module.exports = new AccountController()
