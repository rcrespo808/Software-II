const { Schema, model } = require('mongoose');

const Photo = new Schema({
    ID_Ter: String,
    ID_Pac:String,
    title: String,
    description: String,
    imageURL: String,
    public_id: String,
    
});

module.exports = model('Photo', Photo);