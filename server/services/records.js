const Moment = require('moment');
const recordDB = require('../database/records');
const tokenDB = require('../database/tokens');
const userRecordDB = require('../database/userRecord');
const followupDB = require('../database/followup');
const recordsDTO = require("./models/recordsDTO");

async function createRecord(record) {
  const recordData = record;
  const saveRecord = await recordDB.saveRecord(recordData);
  recordData.idRecord = String(saveRecord._id);
  recordData.creationDate = new Date();
  recordData.creationDate = Moment.parseZone(recordData.creationDate).toISOString();
  const saveUserRecord = await userRecordDB.registerRecord(recordData);
  return { isValid: true, message: 'record open', data: saveUserRecord };
}

async function closeRecords(record) {
  const close = await recordDB.closeRecord(record);

  if (!close) return { isValid: false, message: 'It was not possible to close the record.', data: null };

  return { isValid: true, message: 'The record was closed.', data: null };
}

async function getRecords(token, query) {
  const page = query.page === "" ? 1 : query.page;
  const size = query.size === "" ? 10 : query.size;
  const order = query.order === "" ? "creationDate" : query.order;
  const way = query.way === "" ? 1 : query.way;
  const data = ({
    page,
    size,
    order,
    way,
  });

  const recordsData = recordsDTO.inputGetRecordsDTO(data);

  if (recordsData.isValid === false) return recordsData;

  recordsData.value.page = parseInt(recordsData.value.page, 10);
  recordsData.value.size = parseInt(recordsData.value.size, 10);
  recordsData.value.way = parseInt(recordsData.value.way, 10);
  const offset = (recordsData.value.page * recordsData.value.size) - recordsData.value.size;

  const { idUser } = await tokenDB.findToken(token);
  const records = await userRecordDB.getRecordsByUser(idUser, recordsData, offset);
  const filteredRecords = records.map((record) => {
    return recordsDTO.outputGetRecords(record);
  });

  return ({ isValid: true, message: "Records retrieved successfully", data: filteredRecords });
}

async function getRecord(idRecord) {
  const record = await userRecordDB.getRecord(idRecord.record);
  const followup = await followupDB.findFollowups(idRecord.record);
  const data = recordsDTO.outputRecord(record, followup);
  return { isValid: true, message: 'record', data };
}

module.exports = {
  closeRecords,
  createRecord,
  getRecords,
  getRecord,
};
