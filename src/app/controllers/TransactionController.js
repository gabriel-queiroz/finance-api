const aqp = require('api-query-params')
const { TransactionModel } = require('../models/TransactionModel')
const ObjectId = require('mongoose').Types.ObjectId
const dayjs = require('dayjs')

class TransactionController {
  async store (req, res) {
    let { body: transaction } = req
    // const createdAt = new Date(transaction.createdAt)
    try {
      transaction = await TransactionModel.create({ ...transaction })
      return res.send(transaction)
    } catch (error) {
      return res.status(400).send(error)
    }
  }
  async list (req, res) {
    const { userId } = req
    console.log(userId)
    const { filter } = aqp(req.query)
    const day = dayjs()
    let { AtMonth = day.month() + 1, atYear = day.year() } = filter
    try {
      const transactions = await TransactionModel.aggregate([
        {
          $lookup: {
            from: 'accounts',
            localField: 'account',
            foreignField: '_id',
            as: 'account'
          }
        },
        { $unwind: '$account' },
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category'
          }
        },
        { $unwind: '$category' },
        {
          $project: {
            AtMonth: { $month: '$createdAt' },
            atYear: { $year: '$createdAt' },
            value: 1,
            description: 1,
            type: 1,
            createdAt: 1,
            category: '$category.name',
            account: '$account.name',
            user: '$account.user'
          }
        },
        {
          $match: {
            AtMonth: AtMonth,
            atYear: atYear,
            user: ObjectId(userId)
          }
        },
        {
          $sort: { createdAt: -1 }
        }
      ])
      return res.send(transactions)
    } catch (error) {
      return res.status(400).send(error)
    }
  }
  async update (req, res) {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'id invalido' })
    }
    try {
      let { body: transaction } = req
      const response = await TransactionModel.findByIdAndUpdate(id, transaction)
      if (response == null) {
        return res.status(400).send({ error: 'Transaction not found' })
      }
      return res.status(204).send()
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}

module.exports = new TransactionController()
