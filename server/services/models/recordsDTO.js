const Joi = require("joi");
const Moment = require('moment');
const FILTERDATE = require('../../utils/getDate.constants');

Moment().format();

function inputGetRecordsDTO(getRecordsData) {
  try {
    const schema = Joi.object({
      page: Joi.string().pattern(/^[0-9]+$/, { name: "numbers" }).trim().required(),
      size: Joi.string().pattern(/^[0-9]+$/, { name: "numbers" }).trim().required(),
      order: Joi.string().pattern(/^(Pacient.fullName|creationDate)/, { name: "sort" }).trim().required(),
      way: Joi.string().pattern(/(1|-1)$/, { name: "sort" }).trim().required(),
    });
    const value = schema.validate({
      page: `${getRecordsData.page}`,
      size: `${getRecordsData.size}`,
      order: `${getRecordsData.order}`,
      way: `${getRecordsData.way}`,
    }, { convert: true });
    if (value.error) {
      const message = `${value.error.message.split('"')[1]} has an invalid value`;
      return ({ isValid: false, message, data: null });
    }
    return value;
  } catch (error) {
    return ({ isValid: false, message: error, data: null });
  }
}

function outputGetRecords(record) {
  const outPutRecord = {
    patientName: record.Pacient.fullName,
    dateOfBirth: record.Pacient.birthdate,
    gender: record.Pacient.gender,
    cause: record.Record.cause,
    creationDate: record.creationDate,
  };
  return outPutRecord;
}

function outputRecord(record, followups) {
  const followupsAux = [];
  const creationDate = FILTERDATE.filterDate(record[0].creationDate);

  followups.forEach((followup) => {
    const date = FILTERDATE.filterDate(followup.date);
    const data = {
      date,
      note: followup.note,
    };
    followupsAux.push(data);
  });

  const filter = {
    therapistFullName: `${record[0].therapist.name} ${record[0].therapist.middleName} ${record[0].therapist.lastName}`,
    patientFullName: `${record[0].patient.name} ${record[0].patient.middleName} ${record[0].patient.lastName}`,
    creationDate,
    cause: record[0].record.cause,
    recordStatus: record[0].status === true ? 'Abierto' : 'Cerrado',
    notes: followupsAux,
  };

  return filter;
}

module.exports = {
  inputGetRecordsDTO,
  outputGetRecords,
  outputRecord,
};
