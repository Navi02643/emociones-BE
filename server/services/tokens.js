const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const tokensDB = require("../database/tokens");

async function checkTokenValidator(tokens) {
  const validTokens = [];
  tokens.forEach((token) => {
    jwt.verify(token.refreshToken, config.refreshTokenSecret, (err, decode) => {
      if (err) return err;
      if (decode) validTokens.push(token.refreshToken);
      return 0;
    });
  });
  return validTokens;
}
async function findTokens() {
  const findToken = await tokensDB.findToken();
  const TokenCheck = await checkTokenValidator(findToken);
  return TokenCheck;
}

module.exports = { findTokens };
