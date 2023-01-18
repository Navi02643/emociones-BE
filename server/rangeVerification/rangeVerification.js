const RANGE = require("../utils/range.constans");
const tokenDB = require("../database/tokens");
const userDB = require("../database/users");

const therapistAndAdminRange = async (req, res, next) => {
  const { idUser } = await tokenDB.findToken(req.headers.authorization.split(" ")[1]);
  const userData = await userDB.findById(idUser);
  if (!userData) return res.status(401).send("Unauthorized");
  if (userData.range === RANGE.admin || userData.range === RANGE.therapist) return next();
  return (res.status(403).send({
    isValid: false,
    message: "Requires grant permission",
    data: null,
  }));
};

module.exports = therapistAndAdminRange;
