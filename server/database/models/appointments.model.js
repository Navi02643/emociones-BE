const mongoose = require("mongoose");

const { Schema } = mongoose;

const appointmentsSchema = new Schema({
  idUser: {
    type: String,
  },
  idPacient: {
    type: String,
  },
  date: {
    type: String,
  },
  hour: {
    type: String,
  },
});

module.exports = mongoose.model("Appointments", appointmentsSchema);
