const authRouter = require('express').Router()
const UsersController = require('../controllers/users')

// authRouter.get('/verify', UsersController.verify)

module.exports = { authRouter }
