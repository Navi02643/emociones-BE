const appointmentDTO = require('./models/appointmentDTO');

async function createAppointment(appointment) {
  const check = appointmentDTO.checkAppointmentData(appointment);
  console.log(check);
}

module.exports = { createAppointment };
