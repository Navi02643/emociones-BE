const userDB = require("../database/users");
const tokenDB = require("../database/tokens");
const appointmentDB = require("../database/appointments");
const appointmentDTO = require("./models/appointmentsDTO");
const RANGE = require("../utils/range.constans");

function checkDate(currentDate, dateSave) {
  if (dateSave <= currentDate) return { isValid: false, message: 'The appointment must be greater than today', data: null };

  return { isValid: true, message: 'The appointment is valid', data: null };
}

async function userAppointments(data, user) {
  if (user.range === 2 || user.range === 3) {
    const offset = (data.value.page * data.value.size) - data.value.size;
    const foundAppointments = await appointmentDB.findByUser(user._id, data, offset);
    return foundAppointments;
  }
  if (user.range === 1) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    const foundAppointments = await appointmentDB.findByPatient(user._id, date);
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

async function createAppointment(appointment, token) {
  const appointmentData = appointment;
  const { idUser } = await tokenDB.findToken(token);
  const loggerUser = await userDB.findById(idUser);

  if (loggerUser.range === 1) return { isValid: false, message: 'Logged-in user range not valid', data: null };

  const checkIsTherapist = await userDB.findById(appointment.idUser);

  if (checkIsTherapist.range === 1) return { isValid: false, message: 'The user who tries to register as a therapist is not', data: null };

  const date = (appointment.date).split(" ")[0];
  const hour = (appointment.date).split(" ")[1];
  const current = new Date();
  const dateSave = new Date(date);
  const validAppointment = checkDate(current, dateSave);

  if (validAppointment.isValid === false) return validAppointment;

  const check = appointmentDTO.checkAppointmentData(appointment);

  if (check.isValid === false) return check;

  appointmentData.date = `${date}T${hour}.000+00:00`;
  const availability = await appointmentDB.checkAvailability(appointmentData.idUser, appointmentData.date);

  if (availability.length >= 1) return { isValid: false, message: 'The therapist does not have available this day and time', data: null };
  const save = await appointmentDB.createAppointment(appointmentData);
  return { isValid: true, message: 'Appointment created', data: save };
}

async function deleteAppointment(appointment, range) {
  const date = new Date();
  const data = { _id: appointment._id };
  const search = await appointmentDB.searchAppointment(data);
  if (range === RANGE.patient && search.data.date !== date) {
    return ({ isValid: false, message: "Sorry, contact your therapist directly to make your cancellation", data: null });
  }
  const deleteAppointments = await appointmentDB.deleteAppointment(data);
  if (!deleteAppointments) {
    return ({ isValid: false, message: "Appointment not existing", data: null });
  }
  return ({ isValid: true, message: "Appointment deleted successfully", data: deleteAppointments });
}

module.exports = { getAppointments, deleteAppointment, createAppointment };
