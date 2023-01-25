const tokenService = require("../services/session");
const userDB = require("../database/users");

const firewall = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).send("Unauthorized");
    const isAuthorized = await tokenService.findTokens(req.headers.authorization.split(" ")[1]);
    if (!isAuthorized) return res.status(401).send("Unauthorized");
    const user = await userDB.findById(isAuthorized.idUser);
    if (!user) return res.status(401).send("Unauthorized");
    return next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};

module.exports = firewall;
