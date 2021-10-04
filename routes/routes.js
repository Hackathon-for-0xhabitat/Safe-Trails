const authRouter = require('./auth.routes')
const UsersRouter = require('./users.routes')

const Routes = (app) => {
  //TEST
  // app.get('/api', (req, res) => {
  //   res.status(200).json({ message: 'connected' })
  // })
  //AUTH
  app.use('/auth', authRouter)
  //USERS
  app.use('/users', UsersRouter)
  //MARKS

  //COMMENTS
}

module.exports = Routes
