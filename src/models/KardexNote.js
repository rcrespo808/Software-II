const { Schema, model } = require("mongoose");

const KardexNoteSchema = new Schema(
  {
    title: {type: String, required: true},
    consultantId: {type: String, required: true},
    consultationDate: {type: Date, required: true},
    description: {type: String, required: true},
    user: {type: String, required: true}
  },
  {timestamps: true},
);

module.exports = model("Kardex", KardexNoteSchema);
