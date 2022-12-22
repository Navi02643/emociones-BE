const AppointmentModel = require('./models/appointments.model');

async function saveAppointment(appointment) {
  const appointmentModel = new AppointmentModel(appointment);
  const appointmentSave = await appointmentModel.save();
  return appointmentSave;
}

module.exports = { saveAppointment };
