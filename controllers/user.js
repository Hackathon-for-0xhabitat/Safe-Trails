const User = require('../models/User')
const { validationResult } = require('express-validator')
const utils = require('../helpers/utils')

const findAll = async (req, res) => {
  const users = await User.find({})
  if (users)
    res.status(200).json({
      data: users,
    })
}

const addUser = async (req, res, next) => {
  const { username, email, password } = req.body
  try {
    const data = {
      username,
      email,
      password: await utils.generateHashedPassword(password),
    }
    const newUser = await User.create(data)
    // utils.sendToken(newUser, 200, res)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  findAll,
  addUser,
}
