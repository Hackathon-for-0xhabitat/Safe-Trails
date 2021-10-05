require('dotenv').config()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')
const { login } = require('../controllers/auth')

const authHandler = (app) => {
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
      },
      login
    )
  )

  //JWT
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      function (payload, done) {
        User.findOne({ id: payload.id }, function (err, user) {
          if (err) {
            return done(err, false)
          }
          if (user) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
      }
    )
  )

}

module.exports = { authHandler }
