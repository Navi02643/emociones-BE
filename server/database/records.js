const RecordModel = require('./models/records.model');

async function saveRecord(cause) {
  const recordSave = new RecordModel(cause);
  const savedRecord = await recordSave.save();
  return savedRecord;
}

module.exports = { saveRecord };
