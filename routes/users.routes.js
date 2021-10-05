const UserRouter = require('express').Router()
const UserController = require('../controllers/user')
const { registerValidation } = require('../helpers/utils')
const passport = require('passport')
UserRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  UserController.findAll
)
UserRouter.post('/register', registerValidation, UserController.addUser)

module.exports = UserRouter
