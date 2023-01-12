const UserRecordModel = require('./models/user_record.model');

async function registerCloseRecord(record) {
  const userRecordSave = new UserRecordModel(record);
  const saveUserRecord = await userRecordSave.save();
  return saveUserRecord;
}

module.exports = { registerCloseRecord };
