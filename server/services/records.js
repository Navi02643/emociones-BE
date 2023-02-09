const Moment = require('moment');
const recordDB = require('../database/records');
const tokenDB = require('../database/tokens');
const userDB = require("../database/users");
const followupDB = require('../database/followup');
const userRecordDB = require('../database/userRecord');
const recordsDTO = require("./models/recordsDTO");
const RANGE = require('../utils/range.constans');

async function createRecord(record) {
  const recordData = record;

  const therapist = await userDB.findById(record.idUser);
  const patient = await userDB.findById(record.idPacient);

  if (!therapist || !patient) return { isValid: false, message: 'the therapist or patient does not exist', data: null };

  if ((therapist.range !== RANGE.therapist) || (therapist.range !== RANGE.admin)) {
    return { isValid: false, message: 'The user you are trying to save as a therapist does not have the indicated range', data: null };
  }
  const saveRecord = await recordDB.saveRecord(recordData);
  recordData.idRecord = String(saveRecord._id);
  recordData.creationDate = new Date();
  recordData.creationDate = Moment.parseZone(recordData.creationDate).toISOString();
  const saveUserRecord = await userRecordDB.registerRecord(recordData);
  const filter = recordsDTO.outputCreationRecord(saveUserRecord, saveRecord, patient, therapist);
  return { isValid: true, message: 'record open', data: filter };
}

async function closeRecords(record) {
  const close = await userRecordDB.closeRecord(record);

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

  if (record.length <= 0) return { isValid: false, message: 'Record not found', data: null };

  const followup = await followupDB.findFollowups(idRecord.record);
  const data = recordsDTO.outputRecord(record, followup);
  return { isValid: true, message: 'Record retrieved successfully', data };
}

module.exports = {
  closeRecords,
  createRecord,
  getRecords,
  getRecord,
};
