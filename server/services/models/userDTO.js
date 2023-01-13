const Joi = require('joi');
const Moment = require('moment');

Moment().format();

function checkUserData(user) {
  try {
    const schema = Joi.object({
      name: Joi.string().pattern(/^[a-zA-Z ]+$/, { name: 'alpha' }),
      middleName: Joi.string().allow('').pattern(/^[a-zA-Z ]+$/, { name: 'alpha' }),
      lastName: Joi.string().pattern(/^[a-zA-Z ]+$/, { name: 'alpha' }),
      email: Joi.string().email(),
      phone: Joi.number(),
      maritalStatus: Joi.string(),
      idRecord: Joi.string(),
      gender: Joi.string(),
    });

    const value = schema.validate({
      name: `${user.name}`,
      middleName: `${user.middleName}`,
      lastName: `${user.lastName}`,
      email: `${user.email}`,
      phone: `${user.phone}`,
      maritalStatus: `${user.maritalStatus}`,
      idRecord: `${user.idRecord}`,
      gender: `${user.gender}`,
    });

    const isCorrectDateFormat = Moment(user.birthdate, "YYYY-MM-DD", true).isValid();

    if (!isCorrectDateFormat) {
      return { isValid: false, message: 'The correct birthday format is YYYY MM DD', data: null };
    }

    if (value.error) {
      const message = (value.error.details[0].message).replaceAll('"', '');
      return { isValid: false, message, data: null };
    }

    return { isValid: true, message: 'Fields are valid', data: null };
  } catch (error) {
    return { isValid: false, message: 'the name, lastName, email, phone, birthday, gender, maritalStatus, record is obligatory', data: null };
  }
}

function filterUser(user) {
  const userData = {
    id: user._id,
    fullName: `${user.name} ${user.middleName} ${user.lastName}`,
    email: user.email,
    phone: user.phone,
    birthdate: user.birthdate,
    maritalStatus: user.maritalStatus,
    range: user.range,
    gender: user.gender,
    status: user.status,
  };
  return userData;
}

function inputGetPatients(data) {
  try {
    const schema = Joi.object({
      page: Joi.string().pattern(/^[0-9]+$/, { name: "numbers" }).trim(),
      size: Joi.string().pattern(/^[0-9]+$/, { name: "numbers" }).trim(),
      way: Joi.string().pattern(/(1|-1)$/, { name: "sort" }).trim(),
    });
    const value = schema.validate({
      page: `${data.page}`,
      size: `${data.size}`,
      way: `${data.way}`,
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

function outputGetPatients(user) {
  const patientsData = {
    therapistid: user._id,
    therapistName: user.name,
    therapistMiddleName: user.middleName,
    therapistLastName: user.lastName,
    patientsId: user.patients,
  };
  return patientsData;
}

module.exports = {
  filterUser, checkUserData, inputGetPatients, outputGetPatients,
};
