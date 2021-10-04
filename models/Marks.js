const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const markSchema = new Schema ({
    latitude: {type: String,  required: true},
    longitude: {type: String,  required: true},
    date: {type: String, required: true}
})


const Mark = mongoose.model('Mark', markSchema);

module.exports = Mark;
