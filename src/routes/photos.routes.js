const express = require("express");
const router = express.Router();

// Controller
const {  
showconsul,
showcarpeta, 
renderPhotoForm,
createNewPhoto,
renderPhoto,
renderEditForm,
updatePhoto,
deletePhoto,
download,
downloadar,
downloadaud,
downloadvid,
downloadfot,
} = require("../controllers/photos.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");
//shhow
router.get('/images/consul', isAuthenticated, showconsul);
router.get('/images/carpetas', isAuthenticated, showcarpeta );
// New Photo
router.get("/images/add", isAuthenticated, renderPhotoForm);
router.post("/Photos/new-photo", isAuthenticated, createNewPhoto);
//all photos
router.get("/images", isAuthenticated, renderPhoto);
// Edit photo
router.get("/images/edit/:id", isAuthenticated, renderEditForm);
router.put("/Photos/edit-photos/:id", isAuthenticated, updatePhoto);

// Delete photo
router.delete("/images/delete/:id", isAuthenticated, deletePhoto);
//download

router.get('/images/download/:photo_id', isAuthenticated,download);
router.get('/images/downloadarc/:photo_id', isAuthenticated, downloadar);
 router.get('/images/downloadaud/:photo_id', isAuthenticated, downloadaud);
router.get('/images/downloadvid/:photo_id', isAuthenticated, downloadvid);
router.get('/images/downloadfot/:photo_id', isAuthenticated,downloadfot);

module.exports = router;
/////////////////////////////////////////////////////////////////////////////
