const { Types } = require("mongoose");
const AppointmentModel = require("./models/appointments.model");
require("./models/user.model");

async function findByUser(idUser, parameters, offset, date) {
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
      $match: { $and: [{ "User._id": Types.ObjectId(idUser) }, { date: { $gte: date } }] },
    },
    {
      $sort: {
        [parameters.value.order]: parameters.value.way,
      },
    },
  ]).skip(offset).limit(parameters.value.size);
  return appointments;
}

async function findByPatient(idPacient, parameters, offset, date) {
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
        [parameters.value.order]: parameters.value.way,
      },
    },
  ]).skip(offset).limit(parameters.value.size);
  return appointments;
}

async function findByRangeDate(startDate, endDate) {
  const listAppointment = await AppointmentModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "idPacient",
        foreignField: "_id",
        as: "pacient",
        pipeline: [{ $addFields: { fullName: { $concat: ["$name", " ", "$middleName", " ", "$lastName"] } } }],
      },
    },
    {
      $match: {
        $and: [
          { date: { $gte: new Date(startDate) } },
          { date: { $lt: new Date(endDate) } },
        ],
      },
    },
  ]);
  return listAppointment;
}

async function findByHour(date) {
  const listAppointment = await AppointmentModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "idPacient",
        foreignField: "_id",
        as: "pacient",
        pipeline: [{ $addFields: { fullName: { $concat: ["$name", " ", "$middleName", " ", "$lastName"] } } }],
      },
    },
    {
      $match: { date: new Date(date) },
    },
  ]);
  return listAppointment;
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

async function searchAppointments(appointment) {
  const idAppointment = await AppointmentModel.find({ _id: `${appointment._id}` });
  return idAppointment;
}

async function deleteAppointment(appointment) {
  const idAppointment = await AppointmentModel.findOneAndDelete({ _id: `${appointment._id}` });
  return idAppointment;
}

async function updateAppointment(appointment) {
  const idAppointment = await AppointmentModel.findOneAndUpdate({ _id: `${appointment._id}`, date: `${appointment.date}` });
  return idAppointment;
}

module.exports = {
  findByUser,
  findByPatient,
  deleteAppointment,
  searchAppointment,
  createAppointment,
  findByRangeDate,
  findByHour,
  checkAvailability,
  updateAppointment,
  searchAppointments,
};
