const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    email_is_verified: {
      type: Boolean,
      default: false,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    auth_token: {

    },
    avatar: {
      type: String,
      default:
        '',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }
)

const Users = mongoose.model('Users', userSchema)

module.exports = Users
