const privilegesModel = require("../models/privileges.model");
const database = require("../database/privileges");

function checkModel(model) {
  const privilege = new privilegesModel(model);
  return privilege;
}

async function savePrivilege(model) {
  const privilege = checkModel(model);
  const resp = await database.savePrivilegeDB(privilege);
}

function findPrivilege() {
  return database.findPrivilegesDB();
}

module.exports = { savePrivilege, findPrivilege };
