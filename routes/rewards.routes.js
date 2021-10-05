const RewardsRouter = require('express').Router()
const RewardsController = require('../controllers/rewards')
const passport = require('passport')

RewardsRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  RewardsController.findAll
)
RewardsRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  RewardsController.deleteById
)

module.exports = RewardsRouter
