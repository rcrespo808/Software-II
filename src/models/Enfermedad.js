const { Schema, model } = require('mongoose');
const Photo = require('../models/Photo');

const Enfermedad = new Schema({
   
    title: String,
    description: String,
    Id_photo:String,
    
    
});


module.exports = model('Enfermedad', Enfermedad);