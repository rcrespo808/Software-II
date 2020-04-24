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

// Routes
router.get("/users/consultant", renderConsultantForm);

router.post("/users/consultant", createConsultant);

router.get("/users/therapist", renderTherapistForm);

router.post("/users/therapist", createTherapist);

router.get("/users/signin", renderSigninForm);

router.post("/users/signin", signin);

router.get("/users/logout", logout);

module.exports = router;
