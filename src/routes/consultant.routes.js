const router = require("express").Router();

const {
  renderConsultantForm,
  createNewConsultant,
  renderConsultants,
  renderEditForm,
  updateConsultant,
  deleteConsultant
} = require("../controllers/consultant.controller");

module.exports = router;

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Consultant
router.get("/consultant/add", isAuthenticated, renderConsultantForm);

router.post("/consultant/new-consultant", isAuthenticated, createNewConsultant);

// All Consultants
router.get("/consultant", isAuthenticated, renderConsultants);

// Edit Consultants
router.get("/consultant/edit/:id", isAuthenticated, renderEditForm);

router.put("/consultant/edit-consultant/:id", isAuthenticated, updateConsultant);

// Delete Consultants
router.delete("/consultant/delete/:id", isAuthenticated, deleteConsultant);

module.exports = router;