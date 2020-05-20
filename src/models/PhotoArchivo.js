const { Schema, model } = require('mongoose');

const PhotoArchivo = new Schema({
    ID_Ter: String,
    ID_Pac:String,
    TipoArchivo:String,
    title: String,
    description: String,
    imageURL: String,
    public_id: String,
    
});

module.exports = model('PhotoArchivo', PhotoArchivo);