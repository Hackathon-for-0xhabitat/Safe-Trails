const MarksRouter = require('express').Router()
const MarksController = require('../controllers/marks')
const passport = require('passport')

MarksRouter.get('/', MarksController.findAll)
MarksRouter.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  MarksController.create
)
MarksRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  MarksController.deleteById
)

module.exports = MarksRouter
