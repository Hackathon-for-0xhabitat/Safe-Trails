const Marks = require('../models/Marks')

const findAll = (req, res) => {
  Marks.find()
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: 'error getting data',
        message: 'Error retrieving data from database',
      })
    })
}

const create = (req, res) => {
  const { title, description, lat, lng, username } = req.body
  Marks.create({ title, description, lat, lng, username })
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('Error retrieving data from database')
    })
}

// const updateVote = (req, res) => {
//   const { id, user_id, type, remove } = req.body
//   let updateField = ''
//   if (type === 'up') {
//     const updateField = { $push: { votesup: { user_id } } }
//   } else {
//     const updateField = { $push: { votesdown: { user_id } } }
//   }
//   Marks.updateOne({ _id: id }, updateField)
//     .then((result) => {
//       res.status(200).send(result)
//     })
//     .catch((err) => {
//       console.log(err)
//       res.status(500).send('Error retrieving data from database')
//     })
// }

const deleteById = (req, res) => {
  Marks.findByIdAndRemove({ _id: req.params.id })
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send('Error retrieving data from database')
    })
}

module.exports = { findAll, create, deleteById }
