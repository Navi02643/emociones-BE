const Joi = require("joi");

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
  const appointmentDTO = {
    patientName: appointmentData.Pacient.fullName,
    therapistName: appointmentData.User.fullName,
    date: appointmentData.date,
    hour: appointmentData.hour,
  };

  return appointmentDTO;
}

module.exports = { inputGetAppointmentsDTO, outputGetAppointmentsDTO };