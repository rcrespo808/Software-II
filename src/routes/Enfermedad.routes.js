const { Router } = require('express');

const router = Router();
// Helpers
const { isAuthenticated } = require("../helpers/auth");



const Enfermedad = require('../models/Enfermedad');
const photo = require('../models/Photo');



const fs = require('fs-extra');


// agregar imagen
router.get('/Enfermedad/add',isAuthenticated, async (req, res) => {
    const enfermedades = await Enfermedad.find();
    const photos = await photo.find( {ID_Ter: req.user.id });
  
    res.render('Enfermedad/enfermedad_form', {enfermedades,photos});
    console.log('funciona');
});

//mostrarla
router.post('/Enfermedad/add',  isAuthenticated,async (req, res) => {
    //const { title, description } = req.body;
    title = req.body.title;
    description = req.body.description;
    Id_photo = download(req.body.Id_photo);
    try {
        const newEnf = new Enfermedad({ title, description,Id_photo});
       
  
        await newEnf.save();          
       
        await fs.unlink(req.file.path);
    } catch (e) {
        console.log(e)
    }
   
    res.redirect('/Enfermedad/add');
});
//Eliminar imagen
router.get('/Enfermedad/delete/:_id',isAuthenticated,  async (req, res) => {
    const { _id } = req.params;
    const enfermedades = await Enfermedad.findByIdAndRemove(_id);
   
    res.redirect('/Enfermedad/add');
});


function download(req) {
     var a = req;
     var b = a.substr(0,44);
     var c = a.substr(44,100);
     var d = b + "fl_attachment/" + c;
    return d;
  };

module.exports = router;
//////////////////////////////////////////+
