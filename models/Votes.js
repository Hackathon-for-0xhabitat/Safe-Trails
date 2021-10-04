const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const voteSchema = new Schema ({
    vote: {type: Number, required: true}
})


const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;