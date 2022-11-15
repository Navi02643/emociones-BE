const privilegesModel = require("../models/privileges.model");
const database = require("../database/privileges");

function checkModel(model) {
  const privilege = new privilegesModel(model);
  return privilege;
}

function savePrivilege(model) {
  const privilege = checkModel(model);
  const findPrivilege =  database.findByName(privilege.Name);
  if (findPrivilege.length >= 1) {
    return 0;
  } else {
    const resp =  database.savePrivilegeDB(privilege);
    return resp;
  }
}

function findPrivilege() {
  return database.findPrivilegesDB();
}

module.exports = { savePrivilege, findPrivilege };
