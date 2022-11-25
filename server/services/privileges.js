const privilegesModel = require("../database/models/privileges.model");
const database = require("../database/privileges");

function findPrivilege() {
  return database.findPrivilegesDB();
}

async function savePrivilege(model) {
 const findPrivilege = await database.findByName(privilege.Name);
  if (findPrivilege.length >= 1) {
    return 'The privilege is already registered';
  } else {
    const resp = await database.savePrivilegeDB(privilege);
    return resp;
  }
}

module.exports = { savePrivilege, findPrivilege };
