function filterFollow(follow) {
  const year = (follow.date).getFullYear();
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  let day = (follow.date).getDate();
  const month = (follow.date).getMonth();

  if (day <= 9) day = `0${day}`;
  const date = `${day}-${months[month]}-${year}`;
  return {
    id: follow.id,
    date,
    note: follow.note,
  };
}

module.exports = { filterFollow };
