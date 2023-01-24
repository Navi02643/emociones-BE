const MONTHS = require('../../utils/months.constant');

function filterFollow(follow) {
  const year = (follow.date).getFullYear();
  let day = (follow.date).getDate() + 1;
  const month = (follow.date).getMonth();
  if (day <= 9) day = `0${day}`;
  const date = `${day}-${MONTHS[month]}-${year}`;
  return {
    id: follow.id,
    date,
    note: follow.note,
  };
}

module.exports = { filterFollow };
