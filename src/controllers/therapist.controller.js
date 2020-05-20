const therapistCtrl = {};

// Models
const Therapist = require("../models/Therapist");

therapistCtrl.renderTherapistForm = (req, res) => {
  res.render("therapist/new-therapist");
};

therapistCtrl.createNewTherapist = async (req, res) => {
  const { id, firstName, lastName, gender, age, birthDate  } = req.body;
  const errors = [];
  if (!firstName) {
    errors.push({ text: "Por favor ingresar un Nombre" });
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
    res.render("therapist/new-therapist", {
      errors,firstName, lastName, gender, age, birthDate
    });
  } else {
    const newTherapist = new Therapist({firstName, lastName, gender, age, birthDate});
    newTherapist.user = req.user.id;
    await newTherapist.save();
    res.redirect("../users/therapist");
  }
};

therapistCtrl.renderTherapists = async (req, res) => {
  const therapists = await Therapist.find({ user: req.user.id }).sort({ date: "desc" });
  res.render("therapist/all-therapists", { therapists });
};

therapistCtrl.renderEditForm = async (req, res) => {
  const therapist = await Therapist.findById(req.params.id);
  if (therapist.user != req.user.id) {
    req.flash("error_msg", "No Autorizado");
    return res.redirect("/therapist");
  }
  res.render("therapist/edit-therapist", { therapist });
};

therapistCtrl.updateTherapist = async (req, res) => {
  const { firstName, lastName, gender, age, birthDate} = req.body;
  await Therapist.findByIdAndUpdate(req.params.id, { firstName, lastName, gender, age, birthDate});
  req.flash("success_msg", "Terapeuta agregado con exito");
  res.redirect("/therapist");
};

therapistCtrl.deleteTherapist = async (req, res) => {
  await Therapist.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Terapeuta eliminado con exito");
  res.redirect("/therapist");
};

module.exports = therapistCtrl;