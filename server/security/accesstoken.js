const tokenService = require("../services/tokens");

const firewall = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).send("Unauthorized");

    const accessTokens = await tokenService.findTokens(req.headers.authorization.split(" ")[1]);
    const isAuthorized = accessTokens.includes(req.headers.authorization.split(" ")[1]);

    if (!isAuthorized) return res.status(401).send("Unauthorized");

    return next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};

module.exports = firewall;
