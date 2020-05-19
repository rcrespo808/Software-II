const router = require("express").Router();

const {
  renderConsultantForm,
  createNewConsultant,
  renderConsultants,
  renderEditform,
  updateConsultant,
  deleteConsultant
} = require("../controllers/consultant.controller");

module.exports = router;

// New Consultant
router.get("/consultant/add", isAuthenticated, renderConsultantForm);

router.post("/consultant/new-consultant", isAuthenticated, createNewConsultant);

// Get All Notes
router.get("/consultant", isAuthenticated, renderConsultants);

// Edit Notes
router.get("/consultant/edit/:id", isAuthenticated, renderEditForm);

router.put("/consultant/edit-consultant/:id", isAuthenticated, updateConsultant);

// Delete Notes
router.delete("/consultant/delete/:id", isAuthenticated, deleteConsultant);

module.exports = router;