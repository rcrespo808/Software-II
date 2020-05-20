const { Schema, model } = require('mongoose');

const PhotoVideo = new Schema({
    ID_Ter: String,
    ID_Pac:String,
    TipoArchivo:String,
    title: String,
    description: String,
    imageURL: String,
    public_id: String,
    
});

module.exports = model('PhotoVideo', PhotoVideo);