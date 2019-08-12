const express = require('express')
const routes = express.Router()
const controllers = require('./app/controllers')
const validators = require('./app/validators')
const authMiddleware = require('./app/middleware/auth')

routes.post(
  '/api/users',
  validators.middlewareValidator(validators.UserValidator),
  controllers.UserController.store
)
routes.post('/api/auth', controllers.UserController.authenticate)

routes.use(authMiddleware)

routes.post(
  '/api/categories',
  validators.middlewareValidator(validators.CategoryValidator),
  controllers.CategoryController.store
)
routes.get('/api/categories', controllers.CategoryController.listAll)
routes.put(
  '/api/categories/:id',
  validators.middlewareValidator(validators.CategoryValidator),
  controllers.CategoryController.update
)

routes.post(
  '/api/accounts',
  validators.middlewareValidator(validators.AccountValidator),
  controllers.AccountController.store
)
routes.get('/api/accounts', controllers.AccountController.listAll)
routes.put('/api/accounts/:id', controllers.AccountController.update)

routes.post(
  '/api/transactions',
  validators.middlewareValidator(validators.TransactionValidator),
  controllers.TransactionController.store
)
routes.get('/api/transactions', controllers.TransactionController.list)
routes.put(
  '/api/transactions/:id',
  validators.middlewareValidator(validators.TransactionValidator),
  controllers.TransactionController.update
)

module.exports = routes
