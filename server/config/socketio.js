const { App } = require("uWebSockets.js");

let io;

module.exports = {
  init: (server) => {
    const app = new App();
    // eslint-disable-next-line global-require
    io = require("socket.io")(server, {
      cors: {
        origin: '*',
      },
      rejectUnauthorized: false,
    });

    io.attachApp(app);

    return io;
  },
  get: () => {
    if (!io) {
      throw new Error("Socket no initialized");
    }
    return io;
  },
};
