const tokenService = require("../services/tokens");

const socketVerification = async (socket, next) => {
  const accessTokens = await tokenService.findTokens();
  const isAuthorized = accessTokens.includes(socket.handshake.query.token);
  console.log(isAuthorized);
  if (!isAuthorized) return next(new Error("Unauthorized"));
  return next();
};

module.exports = socketVerification;
