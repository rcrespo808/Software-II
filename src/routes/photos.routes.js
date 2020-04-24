const { Router } = require('express');

const router = Router();

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'upsa',
    api_key: '189187363794752',
    api_secret: 'gCovkUW7Vngg121FIIWRH4o1qoo'
});

const Photo = require('../models/Photo');
const fs = require('fs-extra');

router.get('/', async (req, res) => {
     
    const photos = await Photo.find();
    res.render('images', {photos});
});

// agregar imagen
router.get('/images/add', async (req, res) => {
    const photos = await Photo.find();
    res.render('Photos/image_form', {photos});
    console.log('funciona');
});
//mostrarla
router.post('/images/add', async (req, res) => {
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
router.get('/images/delete/:photo_id', async (req, res) => {
    const { photo_id } = req.params;
    const photo = await Photo.findByIdAndRemove(photo_id);
    const result = await cloudinary.v2.uploader.destroy(photo.public_id);
    console.log(result)
    res.redirect('/images/add');
});

module.exports = router;