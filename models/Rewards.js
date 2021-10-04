const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const rewardSchema = new Schema ({
    reward: {type: String, required: true},
    icon:   {type: String, required: true} 
})


const Reward = mongoose.model('Reward', rewardSchema);

module.exports = Reward;
