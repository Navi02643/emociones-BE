const tokenService = require("../services/session");

const firewall = async (req, res, next) => {
  const accessTokens = await tokenService.findTokens();
  console.log("hofrhogr");
  const isAuthorized = accessTokens.includes(req.headers.authorization.split(" ")[1]);
  if (!isAuthorized) return res.status(401).send("Unauthorized");
  return next();
};

module.exports = firewall;
