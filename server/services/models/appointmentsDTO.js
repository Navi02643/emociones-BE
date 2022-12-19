const Joi = require("joi");

function inputGetAppointmentsDTO(getAppointmentData) {
  try {
    const schema = Joi.object({
      page: Joi.string().pattern(/^[0-9]+$/, { name: "numbers" }).trim(),
      size: Joi.string().pattern(/^[0-9]+$/, { name: "numbers" }).trim(),
      order: Joi.string().pattern(/^(patientName|date)/, { name: "sort" }).trim(),
      way: Joi.string().pattern(/(1|-1)$/, { name: "sort" }).trim(),
    });
    const value = schema.validate({
      page: `${getAppointmentData.page}`,
      size: `${getAppointmentData.size}`,
      order: `${getAppointmentData.order}`,
      way: `${getAppointmentData.way}`,
    });
    if (value.error) {
      const message = `${value.error.message.split('"')[1]} has an invalid value`;
      return ({ isValid: false, message, data: null });
    }
    return value;
  } catch (error) {
    return ({ isValid: false, message: error, data: null });
  }
}

function outputAppointmentsDTO(appointmentData) {
  const appointmentDTO = {
    patientName: `${appointmentData.idPacient.name} ${appointmentData.idPacient.middleName} ${appointmentData.idPacient.lastName}`,
    therapistName: `${appointmentData.idUser.name} ${appointmentData.idUser.middleName} ${appointmentData.idUser.lastName}`,
    date: appointmentData.date,
    hour: appointmentData.hour,
  };

  return appointmentDTO;
}

module.exports = { inputGetAppointmentsDTO, outputAppointmentsDTO };
