const tokenService = require("../services/session");

const socketVerification = async (socket, next) => {
  try {
    if (!socket.handshake.headers.token) return next(new Error("Unauthorized"));
    const isAuthorized = await tokenService.findTokens(socket.handshake.headers.token);
    if (!isAuthorized) return next(new Error("Unauthorized"));
    return next();
  } catch (error) {
    return next(new Error("Unauthorized"));
  }
};

module.exports = socketVerification;
