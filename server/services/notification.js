const appointmentDB = require("../database/appointments");

function buildDate() {
  const now = new Date();
  const hour = now.getHours() + 1;
  const year = now.getFullYear();
  let date = now.getDate() + 1;
  let mounth = now.getMonth() + 1;

  console.log(hour);

  if (mounth <= 9) {
    mounth = `0${mounth}`;
  }

  if (date <= 9) {
    date = `0${date}`;
  }
  const dateInitial = `${year}-${mounth}-${date}T00:00:00.000Z`;
  const dateFinal = `${year}-${mounth}-${date}T23:00:00.000Z`;
  const dateHour = `${year}-${mounth}-${date}T${hour}:00:00.000Z`;
  const dateSendInitial = new Date(dateInitial);
  const dateSendFinal = new Date(dateFinal);
  const dateSendHour = new Date(dateHour);
  return { dateInitial: dateSendInitial, dateFinal: dateSendFinal, dateHour: dateSendHour };
}

async function sendNotification() {
  const date = await buildDate();
  const exist = await appointmentDB.findByRangeDate(date.dateInitial, date.dateFinal);
}

module.exports = { sendNotification };
