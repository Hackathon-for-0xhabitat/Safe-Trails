require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3001
const Routes = require('./routes/routes')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster2.ibofx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then((result)=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log(err)
})

//ROUTES
Routes(app)

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})
