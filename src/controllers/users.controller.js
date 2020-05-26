const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

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

usersCtrl.renderForgotForm = (req, res) => {
  res.render("users/forgot");
};

usersCtrl.forgot = (req,res) => {
  const { email } = req.body;
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    }, 
    function(token, done) {
      User.findOne({ email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No existe una cuenta registrada con ese correo.');
          return res.redirect("users/forgot");
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done = (err,msg) => {
      console.log(msg);
      res.redirect("users/signin");
    }) {
      var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rcrespo809@gmail.com', // TODO: parametrize gmail account
            pass: '!QWER1234q' // TODO: parametrize gmail password
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'Apoyo_App@gmail.com', // TODO: email sender
        subject: 'Nodemailer - Test',
        text: 'Estas recibiendo este correo porque tu (o alguien mas) ha pedido la reiniciar el password para esta cuenta.\n\n' +
          'ppor favor sigue el siguiente hipervinculo, o pegalo en tu barra de navegador para continuar el proceso:\n\n' +
          'http://' + req.headers.host + '/users/reset/' + token + '\n\n' +
          'Si tu no hiciste esta solicitud, ignora este correo y tu password no sera cambiado.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'se ha enviado un correo a ' + user.email + ' con los siguientes pasos a seguir.');
        console.log('mail sent');
        res.redirect("signin");
      });
    }
  ])
}

usersCtrl.renderResetForm = (req, res) => {
  res.render("users/reset");
};

usersCtrl.reset = (req,res) => {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
          req.logIn(user, function(err) {
            done(err, user);
          });
        });
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rcrespo809@gmail.com', // TODO: parametrize gmail account
            pass: '!QWER1234q' // TODO: parametrize gmail password
        }
      });
      var mailOptions = {
          to: user.email,
          from: 'Apoyo_App@gmail.com', // TODO: email sender
          subject: 'Nodemailer - Test',
        text: 'Hola,\n\n' +
          'Esta es la confirmacion de que se ha reinisiado su password asociado al email: ' + user.email + ' \n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        console.log("mail sent");
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
}

module.exports = usersCtrl;