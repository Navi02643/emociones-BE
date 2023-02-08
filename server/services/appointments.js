const userDB = require("../database/users");
const tokenDB = require("../database/tokens");
const appointmentDB = require("../database/appointments");
const appointmentDTO = require("./models/appointmentsDTO");
const notificationService = require("./notification");
const RANGE = require("../utils/range.constans");

function checkDate(currentDate, dateSave) {
  if (dateSave <= currentDate) return { isValid: false, message: 'The appointment must be greater than today', data: null };

  return { isValid: true, message: 'The appointment is valid', data: null };
}

async function userAppointments(data, user) {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  const offset = (data.value.page * data.value.size) - data.value.size;
  if (user.range === RANGE.therapist || user.range === RANGE.admin) {
    const foundAppointments = await appointmentDB.findByUser(user._id, data, offset, date);
    return foundAppointments;
  }
  if (user.range === RANGE.patient) {
    const foundAppointments = await appointmentDB.findByPatient(user._id, data, offset, date);
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

async function createAppointment(appointment) {
  const appointmentData = appointment;

  const dateFinal = `${appointment.date} ${appointment.hour}`;
  const current = new Date();
  const dateSave = new Date(dateFinal);
  const validAppointment = checkDate(current, dateSave);

  if (validAppointment.isValid === false) return validAppointment;

  const check = appointmentDTO.checkAppointmentData(appointment);

  if (check.isValid === false) return check;

  appointmentData.date = `${appointment.date}T${appointment.hour}.000+00:00`;
  const availability = await appointmentDB.checkAvailability(appointmentData.idUser, appointmentData.date);

  if (availability.length >= 1) return { isValid: false, message: 'The therapist does not have available this day and time', data: null };

  const save = await appointmentDB.createAppointment(appointmentData);
  return { isValid: true, message: 'Appointment created', data: save };
}

async function deleteAppointment(appointment, token) {
  const { idUser } = await tokenDB.findToken(token);
  const loggerUser = await userDB.findById({ _id: idUser });
  const data = { _id: appointment._id };
  const appointmentToDelete = await appointmentDB.searchAppointment(data);
  if (!appointmentToDelete) return ({ isValid: false, message: "Appointment already deleted", data: null });
  const currentDate = new Date();
  if (loggerUser.range === RANGE.patient && appointmentToDelete.date.getDate() === currentDate.getDate()) {
    return { isValid: false, message: "Sorry, contact your therapist directly to make your cancellation", data: null };
  }

  const deleteAppointments = await appointmentDB.deleteAppointment(data);
  const patient = await userDB.findById(deleteAppointments.idPacient);
  if (patient) notificationService.cancelledAppointment(deleteAppointments, patient);
  return { isValid: true, message: "Appointment deleted successfully", data: deleteAppointments };
}

async function updateAppointments(appointment) {
  const appointmentDate = appointment.date;
  const date = (appointment.date).split(" ")[0];
  const hour = (appointment.date).split(" ")[1];
  appointmentDate.date = `${date}T${hour}.000+00:00`;

  const data = { _id: appointment._id, date: appointmentDate };

  if (data._id === undefined) {
    return { isValid: false, message: 'Enter the ID (_id) parameter', data: null };
  }

  if (!data.date) {
    return { isValid: false, message: 'Enter the new date value', data: null };
  }

  const updateAppointment = await appointmentDB.updateAppointment(data);
  if (!updateAppointment) {
    return ({ isValid: false, message: "Appointment not existing", data: null });
  }
  return ({ isValid: true, message: "Appointment updated successfully", data: appointment.date });
}

module.exports = {
  getAppointments,
  deleteAppointment,
  createAppointment,
  updateAppointments,
};
