const morganBody = require('morgan-body')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')
const databaseConfig = require('./config/database')
const morgan = require('morgan')
const cors = require('cors')

class App {
  constructor () {
    this.express = express()
    morganBody(this.express)
    this.database()
    this.middlewares()
    this.routes()
  }
  database () {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }
  middlewares () {
    this.express.use(bodyParser.json())
    this.express.use(morgan('combined'))
    this.express.use(cors())
  }
  routes () {
    this.express.use(routes)
  }
}

module.exports = new App().express
