const mongoose = require('mongoose')
const Schema = mongoose.Schema

const markSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  votesup: { type: Array },
  votesdown: { type: Array },
  address: { type: String },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  img: { type: String },
})

const Mark = mongoose.model('Mark', markSchema)

module.exports = Mark
