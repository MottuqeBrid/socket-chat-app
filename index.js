const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const app = express();

const expressServer = http.createServer(app);
const PORT = 3000;

const io = new Server(expressServer);

// io.on("connection", function (socket) {
//   //   console.log("New user connected");
//   socket.on("chat", function (mes) {
//     // console.log(`message: ${mes}`);
//     io.emit("chat_transfer", mes);
//   });
// });

// create socket room
io.on("connection", (socket) => {
  // socket.join("dining-room");
  socket.join("kitchen-room");
  let room = io.sockets.adapter.rooms.get("kitchen-room");
  io.sockets
    .in("kitchen-room")
    .emit("cooking", "Fried Rice Cooking= " + room.size);

  socket.join("bed-room");
  io.sockets.in("bed-room").emit("sleep", "I am sleeping");
  // find number of members in room

  // console.log(room);
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(PORT, function () {
  console.log(`server listening on ${PORT} at http://localhost:${PORT}`);
});
