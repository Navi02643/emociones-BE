const TokenModel = require('./models/tokens.model');

async function deleteSession(session) {
  const idFind = await TokenModel.findOneAndDelete({ idUser: `${session.id}`, refreshToken: `${session.refreshToken}` });
  return idFind;
}

module.exports = { deleteSession };
