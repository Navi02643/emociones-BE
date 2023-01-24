const Joi = require("joi");
const Moment = require('moment');
const MONTHS = require('../../utils/months.constant');

Moment().format();

function checkAppointmentData(appointment) {
  try {
    const schema = Joi.object({
      idUser: Joi.string().min(24).max(24),
      idPacient: Joi.string().min(24).max(24),
    });

    const value = schema.validate({
      idUser: `${appointment.idUser}`,
      idPacient: `${appointment.idPacient}`,
    });

    const date = `${appointment.date} ${appointment.hour}`;
    const isCorrectDateFormat = Moment(date, "YYYY-MM-DD HH:mm:ss", true).isValid();

    if (!isCorrectDateFormat) return { isValid: false, message: 'Invalid date', data: null };

    if (value.error) {
      const message = value.error.details[0].message.replaceAll('"', "");
      return { isValid: false, message, data: null };
    }

    return { isValid: true, message: "Fields are valid", data: null };
  } catch (error) {
    return {
      isValid: false,
      message: "the user, patient and date is obligatory",
      data: null,
    };
  }
}

function inputGetAppointmentsDTO(getAppointmentData) {
  try {
    const schema = Joi.object({
      page: Joi.string().pattern(/^[0-9]+$/, { name: "numbers" }).trim(),
      size: Joi.string().pattern(/^[0-9]+$/, { name: "numbers" }).trim(),
      order: Joi.string().pattern(/^(Pacient.fullName|date)/, { name: "sort" }).trim(),
      way: Joi.string().pattern(/(1|-1)$/, { name: "sort" }).trim(),
    });
    const value = schema.validate({
      page: `${getAppointmentData.page}`,
      size: `${getAppointmentData.size}`,
      order: `${getAppointmentData.order}`,
      way: `${getAppointmentData.way}`,
    }, { convert: true });
    if (value.error) {
      const message = `${value.error.message.split('"')[1]} has an invalid value`;
      return ({ isValid: false, message, data: null });
    }
    return value;
  } catch (error) {
    return ({ isValid: false, message: error, data: null });
  }
}

function outputGetAppointmentsDTO(appointmentData) {
  const hour = Moment.parseZone(appointmentData.date).utc().format("HH:mm");
  const date = Moment.parseZone(appointmentData.date).utc().format("YYYY/MM/DD");
  const appointmentDTO = {
    appointmentId: appointmentData._id,
    patientName: appointmentData.Pacient.fullName,
    therapistName: appointmentData.User.fullName,
    date,
    hour,
  };

  return appointmentDTO;
}

function outPutNotification(appointments) {
  const appointmentAux = [];
  appointments.forEach((appointment) => {
    const dataAppointment = {
      date: `${appointment.date.getDate()} de ${MONTHS[appointment.date.getMonth()]} del ${appointment.date.getFullYear()}`,
      hour: Moment.parseZone(appointment.date).utc().format('HH:MM'),
      phone: appointment.pacient[0].phone,
    };
    appointmentAux.push(dataAppointment);
  });
  return appointmentAux;
}

function outPutCancelNotification(appointments) {
  const appointmentAux = [];
  appointments.forEach((appointment) => {
    const dataAppointment = {
      date: `${appointment.date.getDate()} de ${MONTHS[appointment.date.getMonth()]} del ${appointment.date.getFullYear()}`,
      hour: Moment.parseZone(appointment.date).utc().format('HH:MM'),
    };
    appointmentAux.push(dataAppointment);
  });
  return appointmentAux;
}

module.exports = {
  inputGetAppointmentsDTO,
  outputGetAppointmentsDTO,
  checkAppointmentData,
  outPutNotification,
  outPutCancelNotification,
};
