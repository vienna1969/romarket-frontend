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

const betDagit = require("./mongo/horseRace/betDagit");
const addBotUser = require("./mongo/horseRace/addBotUser");
const getHorses = require("./mongo/horseRace/getHorses");
const History = require("./mongo/horseRace/historyModel");

let saniye = 60;
let raceTime = 30;
var rates = [1.25, 1.5, 1.75, 2.0, 2.5];
let status = false;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
  io.emit("status", status);
  io.emit("horse1Rate", rates[0]);
  io.emit("horse2Rate", rates[1]);
  io.emit("horse3Rate", rates[2]);
  io.emit("horse4Rate", rates[3]);
  io.emit("horse5Rate", rates[4]);
  socket.on("disconnect", function () {});
});

test2();

function test2() {
  botJoin();
  rates = rates.sort(() => Math.random() - 0.5);
  io.emit("horse1Rate", rates[0]);
  io.emit("horse2Rate", rates[1]);
  io.emit("horse3Rate", rates[2]);
  io.emit("horse4Rate", rates[3]);
  io.emit("horse5Rate", rates[4]);
  console.log(rates);
  io.emit("start", false);
  let sayac = saniye;
  start = false;
  var sayar = setInterval(function () {
    if (sayac <= 0) {
      game();
      clearInterval(sayar);
    }
    sayac -= 1;
    io.emit("time", sayac);
    console.log(sayac);
  }, 1000);
}

async function botJoin() {
  const botCountDelay = (saniye * 1000) / 40;
  const horses = await getHorses();
  var sayar = setInterval(function () {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const randomTime = Math.floor(Math.random() * 1000) + 1;
    const randomSite = Math.floor(Math.random() * 5) + 0;
    const horsesa = [
      horses.horse1,
      horses.horse2,
      horses.horse3,
      horses.horse4,
      horses.horse5,
    ];
    setTimeout(async () => {
      if (start) {
        clearInterval(sayar);
        return;
      }

      const data = await addBotUser(randomNumber, horsesa[randomSite]);
      io.emit("game", data);
    }, randomTime);
  }, botCountDelay);
}

function game() {
  let sayac = saniye * 1000;
  let yarisSuresi = raceTime * 1000;
  let start = false;
  let bot = true;
  io.emit("status", true);
  status = true;
  let maxBool = false;

  var data = {
    horse1: 0,
    horse2: 0,
    horse3: 0,
    horse4: 0,
    horse5: 0,
  };

  var ratesa = [0.2, 0.2, 0.2, 0.2, 0.2];

  var race = setInterval(async () => {
    yarisSuresi -= 100;
    if (yarisSuresi <= 0) {
      //bet dağıtma
      clearInterval(race);

      setTimeout(() => {
        io.emit("status", false);
        status = false;
        test2();
      }, 5000);
      //sayacBekleme
    } else {
      if (yarisSuresi % 1000 == 0) {
        const random = [
          Math.floor(Math.random() * 1.2),
          Math.floor(Math.random() * 1.2),
          Math.floor(Math.random() * 1.2),
          Math.floor(Math.random() * 1.2),
          Math.floor(Math.random() * 1.2),
        ];
        ratesa = [
          Math.random() * random[0] + 0.2,
          Math.random() * random[1] + 0.2,
          Math.random() * random[2] + 0.2,
          Math.random() * random[3] + 0.2,
          Math.random() * random[4] + 0.2,
        ];
      }

      data = {
        horse1: data.horse1 + ratesa[0] + 0.1,
        horse2: data.horse2 + ratesa[1] + 0.1,
        horse3: data.horse3 + ratesa[2] + 0.1,
        horse4: data.horse4 + ratesa[3] + 0.1,
        horse5: data.horse5 + ratesa[4] + 0.1,
      };

      io.emit("horse1", data.horse1);
      io.emit("horse2", data.horse2);
      io.emit("horse3", data.horse3);
      io.emit("horse4", data.horse4);
      io.emit("horse5", data.horse5);

      let isFinish = false;
      let winList = [];

      const max = Math.max(data.horse1, data.horse2, data.horse3, data.horse4, data.horse5);
      if(max > 95 && !maxBool) {
        maxBool = true;
        io.emit("flag", true);
        console.log("max", max);
      }

      if (data.horse1 >= 100) {
        console.log("1. at kazandı");
        betDagit(0, rates[0]);
        yarisSuresi = 0;
        isFinish = true;
      } else if (data.horse2 >= 100) {
        console.log("2. at kazandı");
        betDagit(1, rates[1]);
        yarisSuresi = 0;
        isFinish = true;
      } else if (data.horse3 >= 100) {
        console.log("3. at kazandı");
        betDagit(2, rates[2]);
        yarisSuresi = 0;
        isFinish = true;
      } else if (data.horse4 >= 100) {
        console.log("4. at kazandı");
        betDagit(3, rates[3]);
        yarisSuresi = 0;
        isFinish = true;
      } else if (data.horse5 >= 100) {
        console.log("5. at kazandı");
        betDagit(4, rates[4]);
        yarisSuresi = 0;
        isFinish = true;
      }
      //await 2sec
      const horses = await getHorses();
      if (isFinish) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("isFinish");
        console.log(data.horse1);
        winList = [
          {
            name: horses.horse1,
            runner: data.horse1,
          },
          {
            name: horses.horse2,
            runner: data.horse2,
          },
          {
            name: horses.horse3,
            runner: data.horse3,
          },
          {
            name: horses.horse4,
            runner: data.horse4,
          },
          {
            name: horses.horse5,
            runner: data.horse5,
          },
        ].sort((a, b) => b.runner - a.runner);
        console.log("winList");
        console.log(winList);
        await History.create({
          winnerHorse: winList[0].name,
          placements: [
            {
              horse: winList[0].name,
              line: 1,
            },
            {
              horse: winList[1].name,
              line: 2,
            },
            {
              horse: winList[2].name,
              line: 3,
            },
            {
              horse: winList[3].name,
              line: 4,
            },
            {
              horse: winList[4].name,
              line: 5,
            },
          ],
        });
      }
      console.log(data);
      isFinish = false;
      winList = [];
    }
  }, 100);
}

server.listen(3002, () => {
  console.log("Sunucu dinleniyor...");
});
