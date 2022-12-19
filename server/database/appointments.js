const AppointmentModel = require("./models/appointments.model");
require("./models/user.model");

async function findByUser(idUser, limit, offset) {
  const appointments = await AppointmentModel.find({ idUser }).populate("idUser").populate("idPacient").skip(offset)
    .limit(limit);
  return appointments;
}

async function findByPatient(idPacient) {
  const appointments = await AppointmentModel.find({ idPacient, date: { $gte: new Date() } }).populate("idUser").populate("idPacient")
    .limit(1);
  return appointments;
}

module.exports = { findByUser, findByPatient };
