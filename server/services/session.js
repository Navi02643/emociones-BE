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

  if (!dataUser) return ({ isValid: false, message: 'Incorrect email/password', data: null });

  const isCorrectPassword = await bcrypt.compare(user.password, dataUser.password);

  if (!isCorrectPassword) return ({ isValid: false, message: 'Incorrect email/password', data: null });

  const token = tokenGeneration(dataUser);
  const loginData = loginDTO.loginDTO(dataUser, token);
  return { isValid: true, message: 'Login Success', data: loginData };
}

async function logout(session, token) {
  const data = { id: session.idUser, token };
  const sessionFind = await tokenDB.deleteSession(data);
  if (sessionFind) return { isValid: true, message: 'Closed session', data: null };
  return { isValid: true, message: 'The session does not exist', data: null };
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
