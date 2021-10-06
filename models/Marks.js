const mongoose = require('mongoose')
const Schema = mongoose.Schema

const markSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  votesup: { type: Array },
  votesdown: { type: Array },
  address: { type: String },
  username: { type: String },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  img: {
    type: String,
    default:
      'https://thumbs.dreamstime.com/b/white-worn-out-road-marking-gray-asphalt-can-be-used-as-abstract-background-152285785.jpg',
  },
})

const Mark = mongoose.model('Mark', markSchema)

module.exports = Mark
