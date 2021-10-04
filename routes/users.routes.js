const UsersRouter = require('express').Router()
const UsersController = require('../controllers/users')

UsersRouter.get('/viewall', UsersController.findAll)

module.exports = UsersRouter
