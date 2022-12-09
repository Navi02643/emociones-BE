const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const usersDB = require('../database/users');
const tokenDB = require('../database/tokens');
const loginDTO = require('./models/loginDTO');

const config = require('../config/config.json');

function tokenGeneration(postData) {
  const user = {
    email: postData.email,
    password: postData.password,
  };
  const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife });
  const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife });
  const response = {
    idUser: postData._id,
    token,
    refreshToken,
  };
  tokenDB.saveTokenUser(response);
  return response;
}

async function login(user) {
  const dataUser = await usersDB.findEmail(user.email);
  if (!dataUser) return 'Incorrect email/password';
  const isCorrectPassword = await bcrypt.compare(user.password, dataUser.password);
  if (!isCorrectPassword) return 'Incorrect email/password';
  const token = tokenGeneration(dataUser);
  const loginData = loginDTO.loginDTO(dataUser, token);
  return loginData;
}

async function logout(session, refreshToken) {
  const data = { id: session.id, refreshToken };
  const sessionFind = await tokenDB.deleteSession(data);
  if (sessionFind) return 'Closed session';
  return 'The session does not exist';
}

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
  const findToken = await tokenDB.findToken();
  const TokenCheck = await checkTokenValidator(findToken);
  return TokenCheck;
}

module.exports = { login, logout, findTokens };
