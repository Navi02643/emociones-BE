function socketServer(io) {
  io.on("connection", (socket) => {
    console.log(socket.id);
  });
}

module.exports = socketServer;
