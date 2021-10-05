require('dotenv').config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (username, password, done) => {
  try {
    // Check that user exists by email
    const user = await User.findOne({ email: username })
    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password
      done(null, user, { message: 'Successful' })
    } else {
      done(null, false, { message: 'Wrong Credentials' })
    }
  } catch (err) {
    console.log(err)
  }
}

const sendToken = (req, res) => {
  console.log(req.user)
  if (req.user.id) {
    const payload = {
      id: req.user._id,
      username: req.user.username,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    })
    return res.status(200).json({
      access_token: token,
      token_type: 'bearer',
      expires: process.env.JWT_EXPIRE,
    })
  } else {
    res.status(401).json({ message: 'wrong credentials' })
  }
}

const logout = async (req, res, next) => {
  req.logout()
  res.status(200).json({ message: 'Logged Out' })
}

module.exports = {
  login,
  logout,
  sendToken,
}
