const { Schema, model } = require('mongoose');

const PhotoFoto = new Schema({
    ID_Ter: String,
    ID_Pac:String,
    TipoArchivo:String,
    title: String,
    description: String,
    imageURL: String,
    public_id: String,
    
});

module.exports = model('PhotoFoto', PhotoFoto);