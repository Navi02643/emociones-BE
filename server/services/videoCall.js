const io = require("../config/socketio").get();

io.on("connection", (socket) => {
  socket.join(socket.handshake.auth.id);
  socket.leave(socket.id);
  console.log(socket.id);
  socket.emit("me", socket.handshake.auth.id);

  socket.on("disconnecting", () => {
    io.sockets.in(Array.from(socket.rooms)[0]).emit("disconnected", socket.id);
    socket.leave(Array.from(socket.rooms)[0]);

    // io.sockets.in(room).emit("disconnected");
  });

  socket.on("disconnect", () => {

  });

  socket.on("callUser", ({
    from, name, signalData, userToCall,
  }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
    socket.join(data.to);
    socket.leave(socket.handshake.auth.id);
  });
});
