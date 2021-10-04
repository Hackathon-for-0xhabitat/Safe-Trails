const UserRouter = require('express').Router()
const UserController = require('../controllers/user')

UserRouter.get('/viewall', UserController.findAll)

module.exports = UserRouter
