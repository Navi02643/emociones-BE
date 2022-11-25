const userModel = require("./models/user.model");
const tokenModel = require('./models/tokens.model');
async function findUsersDB(email) {
    const users = await userModel.findOne({email});
    return users;
}

async function saveTokenUser(token) {
    const tokenSave = new tokenModel(token)
    const tokens = await tokenSave.save();
    return tokens;
}

module.exports = { findUsersDB, saveTokenUser };