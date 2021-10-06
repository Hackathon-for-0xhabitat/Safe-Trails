const authRouter = require('./auth.routes')
const UsersRouter = require('./users.routes')
const CommentsRouter = require('./comments.routes')
const MarksRouter = require('./marks.routes')
const VotesRouter = require('./votes.routes')
const RewardsRouter = require('./rewards.routes')
const PhotosRouter = require('./photos.routes')

const Routes = (app) => {
  //AUTH
  app.use('/auth', authRouter)
  //USERS
  app.use('/api/users', UsersRouter)
  //MARKS
  app.use('/api/marks', MarksRouter)
  //COMMENTS
  app.use('/api/comments', CommentsRouter)
  //Votes
  app.use('/api/votes', VotesRouter)
  //Rewards
  app.use('/api/rewards', RewardsRouter)

  //PHOTOS
  app.use('/api/photos', PhotosRouter)
}

module.exports = Routes
