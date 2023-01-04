const { Types } = require("mongoose");
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
      $match: { "User._id": Types.ObjectId(idUser) },
    },
    {
      $sort: {
        [parameters.value.order]: parameters.value.way,
      },
    },
  ]).skip(offset).limit(parameters.value.size);
  return appointments;
}

async function findByPatient(idPacient, date) {
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
      $match: { $and: [{ "Pacient._id": Types.ObjectId(idPacient) }, { date: { $gte: date } }] },
    }, {
      $sort: {
        date: 1,
      },
    },
  ]).limit(1);
  return appointments;
}

async function createAppointment(appointment) {
  const newAppointment = new AppointmentModel(appointment);
  const appointmentSave = await newAppointment.save();
  return appointmentSave;
}

async function checkAvailability(idTherapist, date) {
  const exist = await AppointmentModel.aggregate([{ $match: { idUser: Types.ObjectId(idTherapist), date: new Date(date) } }]);
  return exist;
}

async function searchAppointment(appointment) {
  const idAppointment = await AppointmentModel.findById({ _id: `${appointment._id}` });
  return idAppointment;
}

async function deleteAppointment(appointment) {
  const idAppointment = await AppointmentModel.findOneAndDelete({ _id: `${appointment._id}` });
  return idAppointment;
}

module.exports = {
  findByUser,
  findByPatient,
  deleteAppointment,
  searchAppointment,
  createAppointment,
  checkAvailability,
};
