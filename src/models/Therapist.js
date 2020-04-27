const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");
const Person = require("../models/Person");

const TherapistSchema = new Schema({
  id: {type: Number},
  person:{type: Person, required: true}
});

module.exports = model('Therapist', TherapistSchema);