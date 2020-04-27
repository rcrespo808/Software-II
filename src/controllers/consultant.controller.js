const consultantCtrl = {};

// Models
const Consultant = require("../models/Consultant");
const Person = require("../models/Person");

consultantCtrl.renderConsultantForm = (req, res) => {
  res.render("consultant/create-consultant");
};

consultantCtrl.createConsultant = async (req, res) => {
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
    res.render("consultant/modify-consultant", {
      errors,firstName, lastName, gender, age, birthDate
    });
  } else {
    const Person = new Person({ firstName, lastName, gender, age, birthDate});
    const newConsultant = new Consultant({ Person});
    newConsultant.therapist = req.user.id;
    await newConsultant.save();
    req.flash("success_msg", "Consultant Added Successfully");
    res.redirect("/consultant/create-consultant");
  }
};

consultantCtrl.renderConsultants = async (req, res) => {
  const consultants = await Consultant.find({ user: req.user.id }).sort({ date: "desc" });
  res.render("consultant/all-consultants", { consultants });
};

consultantCtrl.renderEditConsultant = async (req, res) => {
  const consultant = await Consultant.findById(req.params.id);
  if (consultant.therapist != req.user.id) {
    req.flash("error_msg", "No Autorizado");
    return res.redirect("/all-consultants");
  }
  res.render("consultant/edit-consultant", { consultant });
};

consultantCtrl.updateConsultant = async (req, res) => {
  const { firstName, lastName, gender, age, birthDate} = req.body;
  await Consultant.findByIdAndUpdate(req.params.id, { firstName, lastName, gender, age, birthDate});
  req.flash("success_msg", "Consultant Updated Successfully");
  res.redirect("/all-consultants");
};

consultantCtrl.deleteConsultant = async (req, res) => {
  await Consultant.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Consultant Deleted Successfully");
  res.redirect("/all-consultants");
};

module.exports = consultantCtrl;