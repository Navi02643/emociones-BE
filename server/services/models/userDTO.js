const Joi = require('joi');

function checkUserData(user) {
  try {
    const schema = Joi.object({
      name: Joi.string().pattern(/^[a-zA-Z]+$/, { name: 'alpha' }),
      middleName: Joi.string().pattern(/^[a-zA-Z]+$/, { name: 'alpha' }),
      lastName: Joi.string().pattern(/^[a-zA-Z]+$/, { name: 'alpha' }),
      email: Joi.string().email(),
      phone: Joi.number(),
      birthdate: Joi.date(),
      maritalStatus: Joi.string(),
      idRecord: Joi.string(),
    });

    const value = schema.validate({
      name: `${user.name}`,
      middleName: `${user.middleName}`,
      lastName: `${user.lastName}`,
      email: `${user.email}`,
      phone: `${user.phone}`,
      birthdate: `${user.birthdate}`,
      maritalStatus: `${user.maritalStatus}`,
      idRecord: `${user.idRecord}`,
    });

    if (value.error) {
      const message = (value.error.details[0].message).replaceAll('"', '');
      return { isValid: false, message, data: null };
    }

    return { isValid: true, message: 'Fields are valid', data: null };
  } catch (error) {
    return { isValid: false, message: 'the name, middleName, lastName, email, phone, birthdate, maritalStatus, record is obligatory', data: null };
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
    status: user.status,
  };
  return userData;
}

module.exports = { filterUser, checkUserData };
