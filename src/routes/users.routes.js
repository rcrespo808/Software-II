const router = require("express").Router();

const {
  renderConsultantForm,
  createConsultant,
  renderTherapistForm,
  createTherapist,
  renderSigninForm,
  signin,
  logout,
  renderForgotForm,
  forgot,
  renderResetForm,
  reset

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

// Forgot
router.get("/users/forgot", renderForgotForm);

router.post("/users/forgot", forgot);

// Reset
router.get("/users/reset/:token", renderResetForm);

router.post("/users/reset/:token", reset);

module.exports = router;
