const userDB = require("../database/users");
const tokenDB = require("../database/tokens");
const appointmentDB = require("../database/appointments");
const appointmentDTO = require("./models/appointmentsDTO");

async function userAppointments(data, user) {
  if (user.range === 2 || user.range === 3) {
    const offset = (data.value.page * data.value.size) - data.value.size;
    const foundAppointments = await appointmentDB.findByUser(user._id, data, offset);
    return foundAppointments;
  }
  if (user.range === 1) {
    const foundAppointments = await appointmentDB.findByPatient(user._id);
    return foundAppointments;
  }
  return ({ isValid: false, message: "Range not valid", data: null });
}

async function getAppointments(query, token) {
  const page = query.page === "" ? 1 : query.page;
  const size = query.size === "" ? 10 : query.size;
  const order = query.order === "" ? "date" : query.order;
  const way = query.way === "" ? 1 : query.way;
  const data = ({
    page,
    size,
    order,
    way,
  });
  const appointmentCheck = appointmentDTO.inputGetAppointmentsDTO(data);

  if (appointmentCheck.isValid === false) return appointmentCheck;

  appointmentCheck.value.page = parseInt(appointmentCheck.value.page, 10);
  appointmentCheck.value.size = parseInt(appointmentCheck.value.size, 10);
  appointmentCheck.value.way = parseInt(appointmentCheck.value.way, 10);
  const { idUser } = await tokenDB.findToken(token);
  const user = await userDB.findById(idUser);

  if (!user) return ({ isValid: false, message: "User not found", data: null });

  const verifiedAppointments = await userAppointments(appointmentCheck, user);

  if (verifiedAppointments.isValid === false) return verifiedAppointments;

  const outputAppointments = verifiedAppointments.map((appointment) => {
    return appointmentDTO.outputGetAppointmentsDTO(appointment);
  });
  return ({ isValid: true, message: "Appointments retrieved successfully", data: outputAppointments });
}

module.exports = { getAppointments };