const { Router } = require('express');

const router = Router();
// Helpers
const { isAuthenticated } = require("../helpers/auth");

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'upsa',
    api_key: '189187363794752',
    api_secret: 'gCovkUW7Vngg121FIIWRH4o1qoo'
});

const Photo = require('../models/Photo');
const fs = require('fs-extra');

router.get('/', isAuthenticated, async (req, res) => {
     
    const photos = await Photo.find();
    res.render('images', {photos});
});

// agregar imagen
router.get('/images/add', isAuthenticated, async (req, res) => {
    const photos = await Photo.find({ ID_Ter: req.user.id });
    res.render('Photos/image_form', {photos});
    console.log('funciona');
});
router.get('/images/consul', isAuthenticated, async (req, res) => {
    const photos = await Photo.find({ ID_Pac: req.user.id });
    res.render('Photos/imageconsul.hbs', {photos});
    console.log('funciona');
});
//mostrarla
router.post('/images/add', isAuthenticated, async (req, res) => {
    const { ID_Ter, ID_Pac, title, description } = req.body;
    console.log('funciona1');
   
    // Saving Image in Cloudinary
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const newPhoto = new Photo({ID_Ter, ID_Pac, title, description, imageURL: result.url, public_id: result.public_id});
       console.log('funcionacloud');
        await newPhoto.save();
        console.log('funcionamongo');
        await fs.unlink(req.file.path);
    } catch (e) {
        console.log(e)
    }
    console.log('funcionahueva');
    res.redirect('/');
});
//Eliminar imagen
router.get('/images/delete/:photo_id', isAuthenticated, async (req, res) => {
    const { photo_id } = req.params;
    const photo = await Photo.findByIdAndRemove(photo_id);
    const result = await cloudinary.v2.uploader.destroy(photo.public_id);
    console.log(result)
    res.redirect('/images/add');
});


//download imagen
router.get('/images/download/:photo_id', isAuthenticated, async (req, res) => {
  const { photo_id } = req.params;
    const photo = await Photo.findById(photo_id);
   var a = photo.imageURL;
   var b = a.substr(0,44);
   var c = a.substr(44,100);
   var d = b + "fl_attachment/" + c;
   res.redirect(d);
    console.log(d)
});


module.exports = router;
//////////////////////////////////////////+



