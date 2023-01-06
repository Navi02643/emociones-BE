const io = require("../config/socketio").get();

io.on("connection", (socket) => {
  socket.join(socket.handshake.auth.id);
  socket.leave(socket.id);
  socket.emit("me", socket.handshake.auth.id);

  socket.on("disconnecting", () => {
    const currentRoom = Array.from(socket.rooms)[0];
    io.sockets.in(currentRoom).emit("destroyPeer");
    io.socketsLeave(currentRoom);
  });

  socket.on("callUser", ({
    from, myPeer, name, userToCall,
  }) => {
    io.sockets.in(userToCall).emit("callUser", { from, name, otherPeer: myPeer });
  });

  socket.on("answerCall", ({ from, fromId, to }) => {
    socket.join(to);
    socket.leave(fromId);
    io.sockets.in(to).emit("callAccepted", from);
  });

  socket.on("destroyPeer", (to) => {
    socket.to(to).emit("destroyPeer");
  });
});
