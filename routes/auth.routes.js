const authRouter = require('express').Router()
const authController = require('../controllers/auth')
const passport = require('passport')

//AUTHENTICATE
authRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  authController.sendToken
)

//LOGOUT
authRouter.get('/logout', authController.logout)

module.exports = authRouter
