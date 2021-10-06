const { check } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerValidation = [
  check('username')
    .exists()
    .withMessage('Please provide a username')
    .isLength({ min: 6 })
    .withMessage('Username is too short'),
  check('email')
    .exists()
    .withMessage('Please provide an email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('password')
    .exists()
    .withMessage('Please provide a password')
    .isLength({ min: 8 })
    .withMessage('Password must be minimum 8 characters long'),
]
const sendToken = (user, res) => {
  if (user.id) {
    const payload = {
      id: user._id,
      username: user.username,
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

const generateHashedPassword = (password) => bcrypt.hash(password, 10)

module.exports = {
  registerValidation,
  generateHashedPassword,
  sendToken,
}
