const consultantCtrl = {};

// Models
const Consultant = require("../models/Consultant");

consultantCtrl.renderConsultantForm = (req, res) => {
  res.render("consultant/new-consultant");
};

consultantCtrl.createNewConsultant = async (req, res) => {
  const { firstName, lastName, gender, age, birthDate } = req.body;
  const errors = [];
  if (!firstName) {
    errors.push({ text: "Porfavor ingresar un Nombre" });
  }
  if (!lastName) {
    errors.push({ text: "Porfavor ingresar un Apellido" });
  }
  if (!gender) {
    errors.push({ text: "Porfavor ingresar un Genero" });
  }
  if (!age) {
    errors.push({ text: "Porfavor ingresar una Edad" });
  }
  if (!birthDate) {
    errors.push({ text: "Porfavor ingresar una Fecha de nacimiento" });
  }
  if (errors.length > 0) {
    res.render("consultant/new-consultant", {
      errors, firstName, lastName, gender, age, birthDate
    });
  } else {
    const newConsultant = new Consultant({firstName, lastName, gender, age, birthDate});
    newConsultant.user = req.user.id;
    await newConsultant.save();
    res.redirect("../users/consultant");
  }
};

consultantCtrl.renderConsultants = async (req, res) => {
  const consultants = await Consultant.find({ user: req.user.id }).sort({ date: "desc" });
  res.render("consultant/all-consultants", { consultants });
};

consultantCtrl.renderEditForm = async (req, res) => {
  const consultant = await Consultant.findById(req.params.id);
  if (consultant.user != req.user.id) {
    req.flash("error_msg", "No Autorizado");
    return res.redirect("/consultant");
  }
  res.render("consultant/edit-consultant", { consultant });
};

consultantCtrl.updateConsultant = async (req, res) => {
  const { firstName, lastName, gender, age, birthDate} = req.body;
  await Consultant.findByIdAndUpdate(req.params.id, { firstName, lastName, gender, age, birthDate});
  req.flash("success_msg", "Consultante actualizado con exito");
  res.redirect("/consultant");
};

consultantCtrl.deleteConsultant = async (req, res) => {
  await Consultant.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Consultante eliminado con exito");
  res.redirect("/consultant");
};

module.exports = consultantCtrl;