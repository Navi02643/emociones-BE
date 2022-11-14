const privilegesModel = require("../models/privileges.model");

function findPrivilegesDB() {
  const privileges = privilegesModel.find();
  return privileges;
}

function findByName(Name) {
  const privilege = privilegesModel.find({ Name });
  return privilege;
}

function savePrivilegeDB(privilege) {
  const newPrivilege = privilege.save();
  return newPrivilege;
}

module.exports = { savePrivilegeDB, findPrivilegesDB, findByName };
