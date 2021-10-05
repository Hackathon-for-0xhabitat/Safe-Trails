const authRouter = require('./auth.routes')
const UsersRouter = require('./users.routes')
const CommentsRouter = require('./comments.routes')
const MarksRouter = require('./marks.routes')
const VotesRouter = require('./votes.routes')
const RewardsRouter = require('./rewards.routes')

const Routes = (app) => {
  //AUTH
  // app.use('/auth', authRouter)
  //USERS
  app.use('/users', UsersRouter)
  //MARKS
  app.use('/marks', MarksRouter)
  //COMMENTS
  app.use('/comments', CommentsRouter)
  //Votes
  app.use('/votes', VotesRouter)
  //Rewards
  app.use('/rewards', RewardsRouter)
}

module.exports = Routes
