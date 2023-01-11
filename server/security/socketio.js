const tokenService = require("../services/session");

const socketVerification = async (socket, next) => {
  try {
    if (!socket.handshake.auth.token) return next(new Error("Unauthorized"));
    const isAuthorized = await tokenService.findTokens(socket.handshake.auth.token);
    if (!isAuthorized) return next(new Error("Unauthorized"));
    return next();
  } catch (error) {
    return next(new Error("Unauthorized"));
  }
};

module.exports = socketVerification;
