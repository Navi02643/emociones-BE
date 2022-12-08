const TokenModel = require("./models/tokens.model");

async function saveTokenUser(token) {
  const tokenSave = new TokenModel(token);
  const tokens = await tokenSave.save();
  return tokens;
}

async function findToken() {
  const ACCESSTOKEN = await TokenModel.find();
  return ACCESSTOKEN;
}

async function deleteSession(session) {
  const idFind = await TokenModel.findOneAndDelete({ idUser: `${session.id}`, refreshToken: `${session.refreshToken}` });
  return idFind;
}

module.exports = { findToken, saveTokenUser, deleteSession };
