const RewardsRouter = require('express').Router()
const RewardsController = require('../controllers/rewards')

RewardsRouter.get('/', RewardsController.findAll)
RewardsRouter.delete('/:id', RewardsController.deleteById)






module.exports = RewardsRouter;