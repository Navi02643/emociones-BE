const PrivilegesModel = require("../models/privileges.model");
const database = require("../database/privileges");

function checkModel(model) {
  const privilege = new PrivilegesModel(model);
  return privilege;
}

function savePrivilege(model) {
  const privilege = checkModel(model);
  const findPrivileges = database.findByName(privilege.Name);
  if (findPrivileges.length >= 1) {
    return 0;
  }
  const resp = database.savePrivilegeDB(privilege);
  return resp;
}

function findPrivilege() {
  return database.findPrivilegesDB();
}

module.exports = { savePrivilege, findPrivilege };
