const TokensModel = require("./models/tokens.model");

async function findToken() {
  const ACCESSTOKEN = await TokensModel.find();
  return ACCESSTOKEN;
}

module.exports = { findToken };
