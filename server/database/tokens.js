const TokensModel = require("./models/tokens.model");

async function findToken(token) {
  const accessToken = await TokensModel.findOne({ token });
  return accessToken;
}

module.exports = { findToken };
