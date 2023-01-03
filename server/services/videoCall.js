const io = require("../config/socketio").get();

io.on("connection", (socket) => {
  socket.join(socket.handshake.auth.id);
  console.log(io.sockets.adapter.rooms);
  socket.emit("me", socket.handshake.auth.id);

  socket.on("disconnect", () => {
    socket.emit()
  });

  socket.on("callUser", ({
    from, name, signalData, userToCall,
  }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});
