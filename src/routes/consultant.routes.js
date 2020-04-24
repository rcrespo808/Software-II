const router = require("express");
const router = express.Router();

const {
  renderConsultantForm,
  createConsultant,
  updateConsultant,
  deleteConsultant
} = require("../controllers/consultant.controller");

// Routes
router.get("/consultant", renderConsultantForm);

router.post("/consultant", createConsultant);

router.put("/consultant/update/:id", updateConsultant);

router.delete("/consultant/delete/:id", deleteConsultant);


module.exports = router;
