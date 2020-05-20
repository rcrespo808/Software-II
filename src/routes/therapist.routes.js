const router = require("express").Router();

const {
  renderTherapistForm,
  createNewTherapist,
  renderTherapists,
  renderEditForm,
  updateTherapist,
  deleteTherapist
} = require("../controllers/therapist.controller");

module.exports = router;

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Therapist
router.get("/therapist/add", isAuthenticated, renderTherapistForm);

router.post("/therapist/new-therapist", isAuthenticated, createNewTherapist);

// All Therapists
router.get("/therapist", isAuthenticated, renderTherapists);

// Edit Therapists
router.get("/therapist/edit/:id", isAuthenticated, renderEditForm);

router.put("/therapist/edit-therapist/:id", isAuthenticated, updateTherapist);

// Delete Therapists
router.delete("/therapist/delete/:id", isAuthenticated, deleteTherapist);

module.exports = router;
