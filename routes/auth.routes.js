const authRouter = require('express').Router()
const authController = require('../controllers/auth')
const { registerValidation } = require('../helpers/utils')

authRouter.post('/login', authController.login)
authRouter.post('/forgotpassword', authController.forgotPassword)
authRouter.post('/passwordreset/:resetToken', authController.resetPassword)

module.exports = authRouter
