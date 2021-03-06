const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    name: String , required: true,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;