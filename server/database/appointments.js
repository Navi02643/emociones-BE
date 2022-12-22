const AppointmentModel = require("./models/appointments.model");
require("./models/user.model");

async function findByUser(idUser, parameters, offset) {
  const appointments = await AppointmentModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "idPacient",
        foreignField: "_id",
        as: "Pacient",
        pipeline: [{ $addFields: { fullName: { $concat: ["$name", " ", "$middleName", " ", "$lastName"] } } }],
      },
    }, {
      $lookup: {
        from: "users",
        localField: "idUser",
        foreignField: "_id",
        as: "User",
        pipeline: [{ $addFields: { fullName: { $concat: ["$name", " ", "$middleName", " ", "$lastName"] } } }],
      },
    },
    { $unwind: "$User" },
    { $unwind: "$Pacient" },
    {
      $sort: {
        [parameters.value.order]: parameters.value.way,
      },
    },
  ]).skip(offset).limit(parameters.value.size);
  return appointments;
}

async function findByPatient(idPacient) {
  const appointments = await AppointmentModel.find({ idPacient, date: { $gte: new Date() } }).populate("idUser").populate("idPacient")
    .limit(1);
  return appointments;
}

async function createAppointment(appointment) {
  const newAppointment = new AppointmentModel(appointment);
  const appointmentSave = await newAppointment.save();
  return appointmentSave;
}

module.exports = { findByUser, findByPatient, createAppointment };
