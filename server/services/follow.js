const followupDB = require('../database/followup');
const followupDTO = require('./models/followDTO');

async function createFollowDay(follow) {
  const followData = follow;
  const currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;

  if (day <= 9) day = `0${day}`;
  if (month <= 9) month = `0${month}`;

  followData.date = `${currentDate.getFullYear()}-${month}-${day}`;
  const searchFollow = await followupDB.findFollow(followData);

  if (searchFollow) return { isValid: false, message: 'You cant create a note, edit the previously created note this day.', data: searchFollow._id };

  const saveFollow = await followupDB.saveFollow(followData);
  const filterFollow = followupDTO.filterFollow(saveFollow);
  return { isValid: true, message: 'note inserted', data: filterFollow };
}

module.exports = { createFollowDay };
