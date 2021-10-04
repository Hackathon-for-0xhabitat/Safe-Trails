const UserRouter = require('express').Router()
const UserController = require('../controllers/user')
const { registerValidation } = require('../helpers/utils')

UserRouter.get('/viewall', UserController.findAll)
UserRouter.post('/register', registerValidation, UserController.addUser)

module.exports = UserRouter
