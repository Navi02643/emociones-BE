const recordDB = require('../database/records');
const userRecordDB = require('../database/userRecord');
const userDB = require('../database/users')

async function closeRecords(record) {
  const saveUserRecord = await userRecordDB.registerCloseRecord(record);

  if (!saveUserRecord) return { isValid: false, message: 'It was not possible to close the record.', data: null };

  const close = await recordDB.closeRecord(record);

  if (!close) return { isValid: false, message: 'It was not possible to close the record.', data: null };

  const userUpdate = await userDB.removeRecord(record.idUser);

  return { isValid: true, message: 'The record was closed.', data: null };
}

module.exports = { closeRecords };
