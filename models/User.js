const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema)

module.exports = User
