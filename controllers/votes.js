const Votes = require('../models/Votes')

const findAll =  (req, res) => {
    Votes.find({})
    .then(([result])=>{
        res.status(200).send(result)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send('Error retrieving data from database')

    })
}


const deleteById = (req, res) =>{
    Votes.findByIdAndRemove({_id: req.params.id})
    .then((result)=>{
        res.status(200).send(result)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send('Error retrieving data from database')
    })
}



module.exports = {findAll, deleteById}

