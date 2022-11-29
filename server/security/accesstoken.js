const tokenService = require("../services/tokens");

const firewall = async (req, res, next) => {
  const accessTokens = await tokenService.findTokens();
  const isAuthorized = accessTokens.includes(req.headers.authorization.split(" ")[1]);
  if (!isAuthorized) return res.status(401).send("Unauthorized");
  next();
};

module.exports = firewall;
