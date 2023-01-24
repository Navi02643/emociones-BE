let io;

module.exports = {
  init: (server) => {
    // eslint-disable-next-line global-require
    io = require("socket.io")(server, {
      cors: {
        origin: '*',
      },
      rejectUnauthorized: false,
      allowEIO3: true,
    });

    return io;
  },
  get: () => {
    if (!io) {
      throw new Error("Socket no initialized");
    }
    return io;
  },
};
