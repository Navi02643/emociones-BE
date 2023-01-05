const io = require("../config/socketio").get();

io.on("connection", (socket) => {
  socket.join(socket.handshake.auth.id);
  socket.leave(socket.id);
  console.log(socket.id);
  console.log(io.sockets.adapter.rooms);
  socket.emit("me", socket.handshake.auth.id);

  socket.on("disconnecting", () => {
    //socket.emit("disconnected", socket.id);
    //socket.broadcast.to(Array.from(socket.rooms)[0]).emit("disconnected", socket.id);
    io.to(Array.from(socket.rooms)[0]).emit("disconnected");
    socket.leave(Array.from(socket.rooms)[0]);
  });

  socket.on("leaveCall", () => {
    socket.broadcast.to(Array.from(socket.rooms)[0]).emit("disconnected", socket.id);
    socket.emit("disconnected", socket.id);
    socket.leave(Array.from(socket.rooms)[0]);
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
