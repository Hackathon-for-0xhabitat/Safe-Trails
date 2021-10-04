require('dotenv').config()
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy
const { login } = require('../controllers/auth')

const authHandler = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.serializeUser((user, cb) => {
    cb(null, user)
  })
  passport.deserializeUser((user, cb) => {
    cb(null, user)
  })

  //Email and password Strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      login
    )
  )

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      function (jwt_payload, done) {
        User.findOne({ id: jwt_payload._id }, function (err, user) {
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

  //   // Facebook Strategy
  //   passport.use(
  //     new FacebookStrategy(
  //       {
  //         clientID: keys.FACEBOOK.clientID,
  //         clientSecret: keys.FACEBOOK.clientSecret,
  //         callbackURL: '/auth/facebook/callback',
  //       },
  //       (accessToken, refreshToken, profile, cb) => {
  //         console.log(chalk.blue(JSON.stringify(profile)))
  //         user = { ...profile }
  //         return cb(null, profile)
  //       }
  //     )
  //   )

  //   // Google Strategy
  //   passport.use(
  //     new GoogleStrategy(
  //       {
  //         clientID: keys.GOOGLE.clientID,
  //         clientSecret: keys.GOOGLE.clientSecret,
  //         callbackURL: '/auth/google/callback',
  //       },
  //       (accessToken, refreshToken, profile, cb) => {
  //         console.log(chalk.blue(JSON.stringify(profile)))
  //         user = { ...profile }
  //         return cb(null, profile)
  //       }
  //     )
  //   )
}

module.exports = authHandler
