const tokensModel = require("../models/tokens.model");

async function findToken() {
  const accessTokens = await tokensModel.find();
  return accessTokens;
}

module.exports = { findToken };
