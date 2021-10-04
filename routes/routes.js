const authRouter = require('./auth.routes')
const UsersRouter = require('./users.routes')

const Routes = (app) => {
    //AUTH
    // app.use('/auth', authRouter)
    //USERS
    app.use('/users', UsersRouter)
    //MARKS

    //COMMENTS

}

module.exports = Routes
