const Users = require('../models/Users')

const findAll = async (req, res) => {
    const users = await Users.find({})
    if (users)
      res.status(200).json({
        data: users,
      })
  }

const addUser = async (req, res) => {

}

const verify = async (req, res, next) => {

}

module.exports = {
    findAll,
    addUser,
    verify
  }
