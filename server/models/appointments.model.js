const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentsSchema = new Schema({
  idUser: {
    type: String,
  },
  idPacient: {
    type: String,
  },
  Date: {
    type: String,
  },
  Hour: {
    type: String,
  },
});

module.exports = mongoose.model("Appointments", appointmentsSchema);