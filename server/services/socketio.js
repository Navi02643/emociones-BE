function socketServer(io) {
  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
      socket.leave(roomId);
    });
  });
}

module.exports = socketServer;
