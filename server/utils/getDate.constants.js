const MONTHS = require('./months.constant');

function filterDate(date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  let day = date.getUTCDate();

  if (day <= 9) day = `0${day}`;

  const dateWithMonth = `${day}-${MONTHS[month]}-${year}`;
  return dateWithMonth;
}

module.exports = {
  filterDate,
};
