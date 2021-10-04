require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const authHandler = require('./middleware/passport')
const errorHandler = require('./middleware/error')
const cors = require('cors')
const path = require('path')
const app = express()
const port = process.env.PORT || 3001
const Routes = require('./routes/routes')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
)
//DB CONNECTION
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster2.ibofx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then((result) => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })

//ROUTES
Routes(app)
//MIDDLEWARE
authHandler(app)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server started on ${port}`)
})
