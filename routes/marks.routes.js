const MarksRouter = require('express').Router()
const MarksCoentroller = require('../controllers/marks')
const passport = require('passport')

MarksRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  MarksCoentroller.findAll
)
MarksRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  MarksCoentroller.create
)
MarksRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  MarksCoentroller.deleteById
)

module.exports = MarksRouter
