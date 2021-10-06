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
    utils.sendToken(newUser, res)
  } catch (e) {
    if (e.code === 11000) {
      const keys = Object.keys(e.keyValue).join(' ')
      res.status(200).json({error: 'Duplicate', message: keys + 'already in use'})
    } else {
    res.status(500).json({error: 'Error', message: 'database error'})}
  }
}

module.exports = {
  findAll,
  addUser,
}
