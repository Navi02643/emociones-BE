const privilegesModel = require("../models/privileges.model");
const database = require("../database/privileges");

function checkModel(model) {
  const privilege = new privilegesModel(model);
  return privilege;
}

function findPrivilege() {
  return database.findPrivilegesDB();
}

async function savePrivilege(model) {
  const privilege = checkModel(model);
  const findPrivilege = await database.findByName(privilege.Name);
  if (findPrivilege.length >= 1) {
    return 'The privilege is already registered';
  } else {
    const resp = await database.savePrivilegeDB(privilege);
    return resp;
  }
}

module.exports = { savePrivilege, findPrivilege };
