const mongoose = require('mongoose')

const TransactionTypes = ['EXPENSE', 'RECIPE', 'TRANSFER']

const TransactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: TransactionTypes
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
})

TransactionSchema.pre('save', async function (next) {
  if (this.type === 'EXPENSE') {
    this.value = -Math.abs(this.value)
  }
})

const TransactionModel = mongoose.model('Transaction', TransactionSchema)

module.exports = {
  TransactionModel,
  TransactionTypes
}
