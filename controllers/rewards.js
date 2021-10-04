const Rewards = require('../models/Rewards')

const findAll =  (req, res) => {
    Rewards.find({})
    .then(([result])=>{
        res.status(200).send(result)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send('Error retrieving data from database')

    })
}



const deleteById = (req, res) =>{
    Rewards.findByIdAndRemove({_id: req.params.id})
    .then((result)=>{
        res.status(200).send(result)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send('Error retrieving data from database')
    })
}


module.exports = {findAll, deleteById}