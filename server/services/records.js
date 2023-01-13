const recordDB = require('../database/records');
const userRecordDB = require('../database/userRecord');

async function createRecord(record) {
  const recordData = record;
  const saveRecord = await recordDB.saveRecord(recordData);
  recordData.idRecord = String(saveRecord._id);
  const saveUserRecord = await userRecordDB.registerRecord(recordData);
  return { isValid: true, message: 'record open', data: saveUserRecord };
}

async function closeRecords(record) {
  const close = await recordDB.closeRecord(record);

  if (!close) return { isValid: false, message: 'It was not possible to close the record.', data: null };

  return { isValid: true, message: 'The record was closed.', data: null };
}

module.exports = {
  closeRecords,
  createRecord,
};
