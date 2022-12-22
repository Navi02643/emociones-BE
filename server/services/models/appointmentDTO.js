const Joi = require("joi");

function checkAppointmentData(appointment) {
  try {
    const schema = Joi.object({
      idUser: Joi.string().min(24).max(24),
      idPacient: Joi.string().min(24).max(24),
      date: Joi.string(),
    });

    const value = schema.validate({
      idUser: `${appointment.idUser}`,
      idPacient: `${appointment.idPacient}`,
      date: `${appointment.date}`,
    });

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

module.exports = { checkAppointmentData };
