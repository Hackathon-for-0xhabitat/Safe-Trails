const authRouter = require('express').Router()
const authController = require('../controllers/auth')
const passport = require('passport')
const { authenticate } = require('../middleware/passport')

//AUTHENTICATE
authRouter.post('/login', authenticate, authController.login)

//LOGOUT
authRouter.get('/logout', authController.logout)

//ERROR HANDLER
authRouter.get('/errors', (req, res) => {
  res.status(404).json({ error: 'Invalid Credentials' })
})

module.exports = authRouter
