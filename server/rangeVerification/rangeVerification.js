const RANGE = require("../utils/range.constans");
const tokenDB = require("../database/tokens");
const userDB = require("../database/users");

const therapistAndAdminRange = async (req, res, next) => {
  const { idUser } = await tokenDB.findToken(req.headers.authorization.split(" ")[1]);
  const { range } = await userDB.findById(idUser);
  if (range === RANGE.admin || range === RANGE.therapist) return next();
  return (res.status(403).send({
    isValid: false,
    message: "Requires grant permission",
    data: null,
  }));
};

const AdminRange = async (req, res, next) => {
  const { idUser } = await tokenDB.findToken(req.headers.authorization.split(" ")[1]);
  const { range } = await userDB.findById(idUser);
  if (range === RANGE.admin) return next();
  return (res.status(403).send({
    isValid: false,
    message: "Requires grant permission",
    data: null,
  }));
};

module.exports = {
  therapistAndAdminRange,
  AdminRange,
};
