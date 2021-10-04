const Comments = require('../models/Comments')

const findAll =  (req, res) => {
    Comments.find({})
    .then(([result])=>{
        res.status(200).send(result)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send('Error retrieving data from database')

    })
}


const create =  (req, res) => {
    const {comment} = req.body
    Comments.create({comment})
    .then((result)=>{
        res.status(200).send(result)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send('Error retrieving data from database')

    })
   
}




const update = (req, res) =>{
    Comments.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(()=>{
        Comments.findOne({_id: req.params.id})
        .then((result)=>{
            res.status(200).send(result)
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).send('Something went wrong')
        })
    })
    }
    





const deleteById = (req, res) =>{
    Comments.findByIdAndRemove({_id: req.params.id})
    .then((result)=>{
        res.status(200).send(result)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send('Error retrieving data from database')
    })
}


module.exports = {findAll, create, update, deleteById}