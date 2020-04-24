const router = require("express");
const router = express.Router();

const {
  renderTherapistForm,
  createTherapist,
  updateTherapist,
  deleteTherapist
} = require("../controllers/therapist.controller");

// Routes
router.get("/therapist", renderTherapistForm);

router.post("/therapist", createTherapist);

router.put("/therapist/update/:id", updateTherapist);

router.delete("/therapist/delete/:id", deleteTherapist);


module.exports = router;
