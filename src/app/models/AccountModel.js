const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const AccountModel = mongoose.model('Account', AccountSchema)

module.exports = AccountModel
