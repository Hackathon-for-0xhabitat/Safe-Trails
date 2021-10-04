const MarksRouter = require('express').Router()
const MarksCoentroller = require ('../controllers/marks')

MarksRouter.get('/', MarksCoentroller.findAll)
MarksRouter.post('/', MarksCoentroller.create)
MarksRouter.delete('/:id', MarksCoentroller.deleteById)

module.exports = MarksRouter;