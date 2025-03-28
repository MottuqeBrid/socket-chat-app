const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const { Socket } = require("dgram");
const app = express();

const expressServer = http.createServer(app);
const PORT = 3000;

const io = new Server(expressServer);

io.on("connection", function (socket) {
  //   console.log("New user connected");
  socket.on("chat", function (mes) {
    // console.log(`message: ${mes}`);
    io.emit("chat_transfer", mes);
  });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(PORT, function () {
  console.log(`server listening on ${PORT} at http://localhost:${PORT}`);
});
