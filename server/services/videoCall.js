const sessionDB = require("../database/tokens");

module.exports = function socketServer(io) {
  io.on("connection", (socket) => {
    socket.on("join", (data) => {
      console.log(socket.handshake.headers.token);
      if (data.range === 2) {
        socket.join(data.idUser);
        socket.emit("roomCreated");
      }
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
      socket.leave(roomId);
    });
  });
};
