const UserModel = require('./models/user.model');

async function saveUser(user) {
  const newUser = new UserModel(user);
  const userSave = await newUser.save();
  return userSave;
}

async function findEmail(email) {
  const searchEmail = await UserModel.findOne({ email });
  return searchEmail;
}

async function findPatient(name) {
  const searchPatient = await UserModel.find({ name: { $regex: `${name}` }, range: 1 });
  return searchPatient;
}

module.exports = { saveUser, findEmail, findPatient };
