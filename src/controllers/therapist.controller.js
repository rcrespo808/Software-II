const therapistCtrl = {};

// Models
const Therapist = require("../models/Therapist");
const Person = require("../models/Person");

therapistCtrl.renderTherapistForm = (req, res) => {
  res.render("therapist/create-therapist");
};

therapistCtrl.createTherapist = async (req, res) => {
  const { id, firstName, lastName, gender, age, birthDate  } = req.body;
  const errors = [];
  if (!firstName) {
    errors.push({ text: "Por favor ingresar un Nombre." });
  }
  if (!lastName) {
    errors.push({ text: "Por favor ingresar un Apellido" });
  }
  if (!gender) {
    errors.push({ text: "Por favor ingresar un Genero" });
  }
  if (!age) {
    errors.push({ text: "Por favor ingresar una Edad" });
  }
  if (!birthDate) {
    errors.push({ text: "Por favor ingresar una Fecha de nacimiento" });
  }
  if (errors.length > 0) {
    res.render("notes/edit-consultant", {
      errors,firstName, lastName, gender, age, birthDate
    });
  } else {
    const Person = new Person({ firstName, lastName, gender, age, birthDate});
    const newTherapist = new Therapist({Person});
    await newTherapist.save();
    req.flash("success_msg", "Therapist Added Successfully");
    res.redirect("/therapist/create-therapist");
  }
};

therapistCtrl.renderTherapists = async (req, res) => {
  const therapists = await Therapist.find({ user: req.user.id }).sort({ date: "desc" });
  res.render("therapist/all-therapists", { therapists });
};

therapistCtrl.renderEditTherapist = async (req, res) => {
  const therapist = await Therapist.findById(req.params.id);
  res.render("therapist/edit-therapist", { consultant });
};

therapistCtrl.updateTherapist = async (req, res) => {
  const { firstName, lastName, gender, age, birthDate} = req.body;
  await Therapist.findByIdAndUpdate(req.params.id, { firstName, lastName, gender, age, birthDate});
  req.flash("success_msg", "Therapist Updated Successfully");
  res.redirect("/all-therapists");
};

therapistCtrl.deleteTherapist = async (req, res) => {
  await Therapist.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Therapist Deleted Successfully");
  res.redirect("/all-therapists");
};

module.exports = therapistCtrl;