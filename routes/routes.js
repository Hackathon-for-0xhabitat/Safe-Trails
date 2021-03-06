const authRouter = require('./auth.routes')
const UsersRouter = require('./users.routes')
const CommentsRouter = require('./comments.routes')
const MarksRouter = require('./marks.routes')
const RewardsRouter = require('./rewards.routes')

const Routes = (app) => {
  //AUTH
  app.use('/auth', authRouter)
  //USERS
  app.use('/api/users', UsersRouter)
  //MARKS
  app.use('/api/marks', MarksRouter)
  //COMMENTS
  app.use('/api/comments', CommentsRouter)
  //Rewards
  app.use('/api/rewards', RewardsRouter)
}

module.exports = Routes
