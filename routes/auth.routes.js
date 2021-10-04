const authRouter = require('express').Router()
const authController = require('../controllers/auth')
const { registerValidation } = require('../helpers/utils')
const passport = require('passport')

authRouter.post(
  '/login',
  passport.authenticate(
    'local',
    {
      successRedirect: '/api/auth/verify',
      failureRedirect: '/api/auth/errors',
      failureFlash: true,
      passReqToCallback: true,
    },
    (req, res) => {
      res.status(404).json({ error: 'inteligence not found' })
    }
  )
)
authRouter.post('/forgotpassword', authController.forgotPassword)
authRouter.post('/passwordreset/:resetToken', authController.resetPassword)

module.exports = authRouter
