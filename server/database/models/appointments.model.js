const mongoose = require("mongoose");

const { Schema } = mongoose;

const appointmentsSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  idPacient: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  date: {
    type: String,
  },
  hour: {
    type: String,
  },
});

module.exports = mongoose.model("appointments", appointmentsSchema);
