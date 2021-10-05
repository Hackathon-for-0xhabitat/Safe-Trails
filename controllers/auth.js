require('dotenv').config()
const User = require('../models/User')

const login = async (req, username, password, done, next) => {
  console.log(username, password, done, next)
  try {
    // Check that user exists by email
    const user = await User.findOne({ email: username })
    if (!user) {
      return done(null, false, { message: 'Invalid Credentials' })
    }
    // Check that password match
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return done(null, false, { message: 'Invalid Credentials' })
    }
    return done(null, user)
  } catch (err) {
    return done(err, null)
  }
}

const sendToken = (error, user, res) => {
  const payload = {
    id: user._id,
    username: user.username,
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
  return res.json({
    access_token: token,
    token_type: 'bearer',
    expires: process.env.JWT_EXPIRE,
  })
}

const logout = async (req, res, next) => {
  req.logout()
  res.redirect('/')
}

module.exports = {
  login,
  logout,
  sendToken,
}
