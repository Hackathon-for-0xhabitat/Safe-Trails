require('dotenv').config()
const passport = require('passport')
const ErrorResponse = require('../helpers/ErrorResponse')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy
const { login } = require('../controllers/auth')
const User = require('../models/User')

const authHandler = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      const userInformation = {
        id: user._id,
        username: user.username,
      }
      done(err, userInformation)
    })
  })

  //Email and password Strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true,
        failWithError: true,
      },
      login
    )
  )
}

const authenticate = (req, res, next) => {
  passport.authenticate('local')
}

module.exports = { authHandler, authenticate }
