const TokenModel = require("./models/tokens.model");

async function saveTokenUser(token) {
  const tokenSave = new TokenModel(token);
  const tokens = await tokenSave.save();
  return tokens;
}

async function findToken(token) {
  const accessToken = await TokenModel.findOne({ token });
  return accessToken;
}

async function deleteSession(session) {
  const idFind = await TokenModel.findOneAndDelete({ token: `${session.token}` });
  return idFind;
}

module.exports = { findToken, saveTokenUser, deleteSession };
