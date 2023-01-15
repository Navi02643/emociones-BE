const UserModel = require('./models/user.model');
const RANGE = require('../utils/range.constans');

async function saveUser(user) {
  const newUser = new UserModel(user);
  const userSave = await newUser.save();
  return userSave;
}

async function findEmail(email) {
  const searchEmail = await UserModel.findOne({ email });
  return searchEmail;
}

async function findPatient(user) {
  const searchPatient = await UserModel.find({ name: { $regex: `${user.name}` }, range: RANGE.patient });
  return searchPatient;
}

async function findPatients() {
  const searchPatient = await UserModel.find({ range: RANGE.patient });
  return searchPatient;
}

async function findById(id) {
  const searchId = await UserModel.findById(id);
  return searchId;
}

module.exports = {
  saveUser,
  findEmail,
  findPatient,
  findById,
  findPatients,
};
