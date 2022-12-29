const { create } = require("../database/models/tokens.model");
const tokensDB = require("../database/tokens");
const usersDB = require("../database/users");

const io = require("../config/socketio").get();

function join(socket, data) {
  const tokenData = tokensDB.findToken(socket.handshake.headers.token);
  const user = usersDB.findById(tokenData.idUser);
  console.log(socket.handshake.headers.token);
  if (data.range === 2) {
    socket.join(data.idUser);
    socket.emit("roomCreated");
  }
}

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    join(socket, data);
  });

  socket.on("disconnect", () => {
    console.log("test");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    console.log("test");
  });
});

function videoCallRoute(room) {
  const createdRoom = createRoom(room);
  return ({ isValid: true });
}

module.exports = { join, videoCallRoute };
