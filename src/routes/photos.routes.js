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
const User = require('../models/User');

const PhotoArchi = require('../models/PhotoArchivo');
const Photofot = require('../models/PhotoFoto');
const Photovid = require('../models/PhotoVideo');
const Photoaud = require('../models/PhotoAudio');

const fs = require('fs-extra');

router.get('/', isAuthenticated, async (req, res) => {    
    const photos = await Photo.find();
    res.render('images', {photos});
});

router.get('/images', isAuthenticated, async (req, res) => {
    const photos = await Photo.find({ ID_Ter: req.user.id });
    const users = await User.find({isTherapist: 'false'} );    
    res.render('Photos/all-photos', {photos,users});
});

router.get('/images/add', isAuthenticated, async (req, res) => {
    const photos = await Photo.find({ ID_Ter: req.user.id });
    const users = await User.find({isTherapist: 'false'} );   
    res.render('Photos/new-photo', {photos,users});
});

router.get('/images/consul', isAuthenticated, async (req, res) => {
    const photos = await Photo.find({ ID_Pac: req.user.id });
    res.render('Photos/all-photosConsultant', {photos});
});

router.get('/images/carpetas', isAuthenticated, async (req, res) => {
    const photoarchivos = await PhotoArchi.find({ ID_Pac: req.user.id });
    const photofotos = await Photofot.find({ ID_Pac: req.user.id });
    const photovideos = await Photovid.find({ ID_Pac: req.user.id });
    const photosaudios = await Photoaud.find({ ID_Pac: req.user.id });
    res.render('Photos/Carpeta',{photoarchivos, photofotos, photovideos, photosaudios}   );
    console.log('funciona');
});

// Mostrar
router.post('/images/add', isAuthenticated, async (req, res) => {
    const { ID_Ter, ID_Pac,TipoArchivo, title, description } = req.body;
    console.log('funciona');
    // Saving Image in Cloudinary
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        const newPhoto = new Photo({ID_Ter, ID_Pac,TipoArchivo, title, description, imageURL: result.url, public_id: result.public_id});
        const newPhotoAr = new PhotoArchi({ID_Ter, ID_Pac,TipoArchivo, title, description, imageURL: result.url, public_id: result.public_id});
        const newPhotoAud = new Photoaud({ID_Ter, ID_Pac,TipoArchivo, title, description, imageURL: result.url, public_id: result.public_id});
        const newPhotoVid = new Photovid({ID_Ter, ID_Pac,TipoArchivo, title, description, imageURL: result.url, public_id: result.public_id});
        const newPhotoFot = new Photofot({ID_Ter, ID_Pac,TipoArchivo, title, description, imageURL: result.url, public_id: result.public_id});

        await newPhoto.save();
        console.log('funciona');
    if (newPhotoAr.TipoArchivo == "Archivo")
        {
        await newPhotoAr.save();
    }else if (newPhotoAud.TipoArchivo == 'Audio')
    {
        await newPhotoAud.save();
    }else if (newPhotoVid.TipoArchivo == 'Video')
    {
        await newPhotoVid.save();
    }
    else if (newPhotoFot.TipoArchivo == 'Foto')
    {
        await newPhotoFot.save();
    }
        await fs.unlink(req.file.path);
    } catch (e) {
        console.log(e)
    }
    res.redirect('/images');
});

//Eliminar imagen
router.get('/images/delete/:photo_id', isAuthenticated, async (req, res) => {
    const { photo_id } = req.params;
    const photo = await Photo.findByIdAndRemove(photo_id);
    const result = await cloudinary.v2.uploader.destroy(photo.public_id);
    console.log(result)
    res.redirect('/images');
});

//Download imagen
router.get('/images/download/:photo_id', isAuthenticated, async (req, res) => {
  console.log("entra");
    const { photo_id } = req.params;
    const photo = await Photo.findById(photo_id);
   var a = photo.imageURL;
   var b = a.substr(0,44);
   var c = a.substr(44,100);
   var d = b + "fl_attachment/" + c;
   res.redirect(d);
    console.log(d)
});

router.get('/images/downloadarc/:photo_id', isAuthenticated, async (req, res) => {
    console.log("entra");
    const { photo_id } = req.params;
      const photo = await PhotoArchi.findById(photo_id);
     var a = photo.imageURL;
     var b = a.substr(0,44);
     var c = a.substr(44,100);
     var d = b + "fl_attachment/" + c;
     res.redirect(d);
      console.log(d)
  });
  router.get('/images/downloadaud/:photo_id', isAuthenticated, async (req, res) => {
    const { photo_id } = req.params;
      const photo = await Photoaud.findById(photo_id);
     var a = photo.imageURL;
     var b = a.substr(0,44);
     var c = a.substr(44,100);
     var d = b + "fl_attachment/" + c;
     res.redirect(d);
      console.log(d)
  });
  router.get('/images/downloadvid/:photo_id', isAuthenticated, async (req, res) => {
    const { photo_id } = req.params;
      const photo = await Photovid.findById(photo_id);
     var a = photo.imageURL;
     var b = a.substr(0,44);
     var c = a.substr(44,100);
     var d = b + "fl_attachment/" + c;
     res.redirect(d);
      console.log(d)
  });
  router.get('/images/downloadfot/:photo_id', isAuthenticated, async (req, res) => {
    const { photo_id } = req.params;
      const photo = await Photofot.findById(photo_id);
     var a = photo.imageURL;
     var b = a.substr(0,44);
     var c = a.substr(44,100);
     var d = b + "fl_attachment/" + c;
     res.redirect(d);
      console.log(d)
  });

module.exports = router;
//////////////////////////////////////////+
