const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
  socket.on("GeneralChatRoom", function (msg) {
    console.log("General Chat Room: " + msg);
    io.emit("GeneralChatRoom", msg);
  });
  // todo horseRace coinFlip roulette
  socket.on("horseRaceRoom", function (msg) {
    console.log("horseRaceRoom: " + msg);
    io.emit("horseRaceRoom", msg);
  });
  socket.on("coinFlipRoom", function (msg) {
    console.log("coinFlipRoom: " + msg);
    io.emit("coinFlipRoom", msg);
  });
  socket.on("rouletteRoom", function (msg) {
    console.log("rouletteRoom: " + msg);
    io.emit("rouletteRoom", msg);
  });
});

server.listen(3001, () => {
  console.log("Chat Sunucu dinleniyor...");
});
