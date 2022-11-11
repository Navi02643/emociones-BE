const privilegesModel = require("../models/privileges.model");

function findPrivilegesDB() {
    const privileges = privilegesModel.find();
    return privileges;
  }
  

async function savePrivilegeDB(privilege) {
  const newPrivilege = await privilege.save();
  return newPrivilege;
}

module.exports = { savePrivilegeDB, findPrivilegesDB };
