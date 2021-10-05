const MarksRouter = require('express').Router();
const MarksController = require('../controllers/marks');
// const passport = require('passport');

MarksRouter.get('/', MarksController.findAll);
// MarksRouter.post(
//    '/',
//    passport.authenticate('jwt', { session: false }),
//    MarksCoentroller.create
// );
// MarksRouter.delete(
//    '/:id',
//    passport.authenticate('jwt', { session: false }),
//    MarksCoentroller.deleteById
// );

module.exports = MarksRouter;
