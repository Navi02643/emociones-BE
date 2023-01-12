const RecordModel = require('./models/records.model');

async function saveRecord(cause) {
  const recordSave = new RecordModel(cause);
  const savedRecord = await recordSave.save();
  return savedRecord;
}

async function closeRecord(record) {
  const recordDelete = await RecordModel.findByIdAndUpdate(record.idRecord, { open: false });
  return recordDelete;
}

module.exports = { saveRecord, closeRecord };
