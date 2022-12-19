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

async function findById(id) {
  const searchId = await UserModel.findById(id);
  return searchId;
}

module.exports = { saveUser, findEmail, findById };
