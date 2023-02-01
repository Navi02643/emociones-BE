const Joi = require("joi");
const Moment = require('moment');

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
  const outputRecord = {
    patientName: record.Pacient.fullName,
    dateOfBirth: record.Pacient.birthdate,
    gender: record.Pacient.gender,
    cause: record.Record.cause,
    creationDate: record.creationDate,
  };
  return outputRecord;
}

function outputCreationRecord(history, cause, patient, therapist) {
  const data = {
    idRecord: history._id,
    cause: cause.cause,
    patientName: `${patient.name} ${patient.middleName} ${patient.lastName}`,
    therapistName: `${therapist.name} ${patient.middleName} ${therapist.lastName}`,
  };
  return data;
}

module.exports = {
  inputGetRecordsDTO,
  outputGetRecords,
  outputCreationRecord,
};
