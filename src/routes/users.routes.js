const router = require("express").Router();

const {
  renderConsultantForm,
  createConsultant,
  renderTherapistForm,
  createTherapist,
  renderSigninForm,
  signin,
  logout
} = require("../controllers/users.controller");

// Login Consultant
router.get("/users/consultant", renderConsultantForm);

router.post("/users/consultant", createConsultant);

// Login Therapist
router.get("/users/therapist", renderTherapistForm);

router.post("/users/therapist", createTherapist);

// Login
router.get("/users/signin", renderSigninForm);

router.post("/users/signin", signin);

// Logout
router.get("/users/logout", logout);


module.exports = router;
