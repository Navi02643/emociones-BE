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
  const refreshToken = jwt.sign(user, config.refreshTokenSecret);
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

async function checkTokenValidator(token) {
  const validToken = [];
  jwt.verify(token.token, config.secret, (err, decode) => {
    if (decode) validToken.push(token.refreshToken);
    return 0;
  });
  return validToken;
}

async function findTokens(token) {
  const findToken = await tokenDB.findToken(token);
  const TokenCheck = await checkTokenValidator(findToken);
  return TokenCheck;
}

module.exports = { login, logout, findTokens };
