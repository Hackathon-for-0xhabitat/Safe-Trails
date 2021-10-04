const Marks = require('../models/Marks')

const findAll =  (req, res) => {
    Marks.find({})
    .then(([result])=>{
        res.status(200).send(result)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send('Error retrieving data from database')

    })
}

const create =  (req, res) => {
    const {latitude, longitude, date} = req.body
    Marks.create({latitude, longitude, date})
    .then((result)=>{
        res.status(200).send(result)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send('Error retrieving data from database')

    })
   
}

const deleteById = (req, res) =>{
    Marks.findByIdAndRemove({_id: req.params.id})
    .then((result)=>{
        res.status(200).send(result)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send('Error retrieving data from database')
    })
}



module.exports = {findAll, create, deleteById};