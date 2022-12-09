const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const database = require("../database/tokens");

async function checkTokenValidator(token) {
  const validTokens = [];
  jwt.verify(token.token, config.secret, (err, decode) => {
    if (err) return err;
    if (decode) validTokens.push(token.token);
    return 0;
  });
  return validTokens;
}
async function findTokens(token) {
  const findToken = await database.findToken(token);
  const TokenCheck = await checkTokenValidator(findToken);
  return TokenCheck;
}

module.exports = { findTokens };
