const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");

usersCtrl.createConsultant = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Contrasenas no son Iguales" });
  }
  if (password.length < 4) {
    errors.push({ text: "Ingrese Contrasena con Minimo 4 Caracteres" });
  }
  if (errors.length > 0) {
    res.render("users/consultant", {
      errors,
      Id,
      name,
      email,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "El Correo ya esta Siendo Utilizado");
      res.redirect("/users/consultant");
    } else {
      // Saving a New User
      const newUser = new User({ name, email, password, isConsultant:true});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Registrado Exitosamente");
      res.redirect("/consultant");
    }
  }
};

usersCtrl.createTherapist = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Contrasenas no son Iguales" });
  }
  if (password.length < 4) {
    errors.push({ text: "Ingrese Contrasena con Minimo 4 Caracteres" });
  }
  if (errors.length > 0) {
    res.render("users/therapist", {
      errors,
      name,
      Id,
      email,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "El Correo ya esta Siendo Utilizado");
      res.redirect("/users/therapist");
    } else {
      // Saving a New User
      const newUser = new User({ name, email, password, isTherapist:true });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Registrado Exitosamente");
      res.redirect("/therapist");
    }
  }
};

usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin");
};

usersCtrl.renderConsultantForm = (req, res) => {
  res.render('users/consultant');
};

usersCtrl.renderTherapistForm = (req, res) => {
  res.render("users/therapist");
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/signin",
    failureFlash: true
  });

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Salio con exito!");
  res.redirect("/users/signin");
};

module.exports = usersCtrl;