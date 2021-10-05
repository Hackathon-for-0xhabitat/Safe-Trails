const CommentsRouter = require('express').Router()
const CommentsController = require('../controllers/comments')
const passport = require('passport')

CommentsRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  CommentsController.findAll
)
CommentsRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  CommentsController.create
)
CommentsRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  CommentsController.update
)
CommentsRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  CommentsController.deleteById
)

module.exports = CommentsRouter
