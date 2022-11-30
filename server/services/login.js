const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const loginDB = require('../database/login');
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
  loginDB.saveTokenUser(response);
  return response;
}

async function login(user) {
  const dataUser = await loginDB.findUsersDB(user.email);
  const isCorrectPassword = await bcrypt.compare(user.password, dataUser.password);
  if (!isCorrectPassword) return 'Incorrect email/password';
  const token = tokenGeneration(dataUser);
  const loginData = loginDTO.loginDTO(dataUser, token);
  return loginData;
}

module.exports = { login };
