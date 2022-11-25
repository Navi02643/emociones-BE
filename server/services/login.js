const loginDB = require('../database/login');
const loginDTO = require('./models/loginDTO')

const jwt = require('jsonwebtoken')
const config = require('../config/config.json')


async function login(user){
    const dataUser = await loginDB.findUsersDB(user.email);
    const token = tokenGeneration(user)
    const loginData = loginDTO.loginDTO(dataUser,token);
    return loginData;
}

function tokenGeneration(postData) {
    const user = {
        "email": postData.email,
        "password": postData.password
    }
    const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
    const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
    const response = {
        "status": "Logged in",
        "token": token,
        "refreshToken": refreshToken,
    }
    loginDB.saveTokenUser(response);
    return response
}


module.exports = {login};