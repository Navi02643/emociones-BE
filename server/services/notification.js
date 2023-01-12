const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const userDB = require("../database/users");
const tokenDB = require("../database/tokens");
const appointmentDB = require("../database/appointments");
const appointmentDTO = require('./models/appointmentsDTO');
const ACTIONS = require('../utils/actions.constans');
const RANGE = require("../utils/range.constans");

function buildDate() {
  const now = new Date();
  const hour = now.getHours() + 1;
  const year = now.getFullYear();
  let day = now.getDate();
  let date = now.getDate() + 1;
  let mounth = now.getMonth() + 1;

  if (mounth <= 9) {
    mounth = `0${mounth}`;
  }
  if (date <= 9 || day <= 9) {
    date = `0${date}`;
    day = `0${day}`;
  }

  const dateSendInitial = new Date(`${year}-${mounth}-${date}T00:00:00.000Z`);
  const dateSendFinal = new Date(`${year}-${mounth}-${date}T23:00:00.000Z`);
  const dateSendHour = new Date(`${year}-${mounth}-${day}T${hour}:00:00.000Z`);
  return { dateInitial: dateSendInitial, dateFinal: dateSendFinal, dateHour: dateSendHour };
}

async function getListAppointment(action) {
  const date = buildDate();
  let list;
  if (Number(action) === ACTIONS.rememberDay) {
    list = await appointmentDB.findByRangeDate(date.dateInitial, date.dateFinal);
  }
  if (Number(action) === ACTIONS.rememberHour) {
    list = await appointmentDB.findByHour(date.dateHour);
  }

  if (list.length <= 0) return { isValid: false, message: 'Appointments not found', data: null };

  return { isValid: true, message: 'Appointments found', data: list };
}

function buildStructure(message, phone) {
  client.messages.create({
    from: 'whatsapp:+14155238886',
    body: `${message}`,
    to: `whatsapp:+521${phone}`,
  });
}

async function sendNotification(action, token) {
  const { idUser } = await tokenDB.findToken(token);
  const loggerUser = await userDB.findById(idUser);

  if (loggerUser.range === RANGE.patient) return { isValid: false, message: 'Logged-in user range not valid', data: null };

  const list = await getListAppointment(action.action);

  if (list.isValid === false) return list;

  const filterList = appointmentDTO.outPutNotification(list.data);
  filterList.forEach((item) => {
    const message = `Tu próxima cita en Beginning es el dia ${item.date} a las ${item.hour}`;
    buildStructure(message, item.phone);
  });
  return { isValid: true, message: 'Notifications were sent successfully', data: null };
}

async function cancelledAppointment(appointment, user) {
  const filteredAppointmentDate = appointmentDTO.outPutCancelNotification([appointment]);
  const message = `Su cita en Beggining del ${filteredAppointmentDate[0].date} a las ${filteredAppointmentDate[0].hour} ha sido cancelada`;
  buildStructure(message, user.phone);
}

module.exports = { sendNotification, cancelledAppointment };
