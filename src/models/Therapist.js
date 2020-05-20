const { Schema, model } = require("mongoose");

const TherapistSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    birthDate: { type: Date},
    user: {type: String, required: true}
  },
    {timestamps: true},
);

module.exports = model('Therapist', TherapistSchema);