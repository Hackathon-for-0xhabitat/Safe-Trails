const VotesRouter = require('express').Router()
const VotesController = require('../controllers/votes')

VotesRouter.get('/', VotesController.findAll)
VotesRouter.delete('/:id', VotesController.deleteById)






module.exports = VotesRouter;