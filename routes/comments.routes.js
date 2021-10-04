const CommentsRouter = require('express').Router()
const CommentsController = require('../controllers/comments')

CommentsRouter.get('/', CommentsController.findAll)
CommentsRouter.post('/', CommentsController.create)
CommentsRouter.put('/:id', CommentsController.update)
CommentsRouter.delete('/:id', CommentsController.deleteById)





module.exports = CommentsRouter;