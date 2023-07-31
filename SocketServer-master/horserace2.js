const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = require("socket.io")(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const HorseGame = require("./mongo/horseRace/gameModel");
const History = require("./mongo/horseRace/historyModel");
const HorsesModel = require("./mongo/horseRace/horseNames");
const User = require("./mongo/userModel");

var raceTime = 30 * 1000;
var horse = [0, 0, 0, 0, 0];
var time = 60;
var rates = [1.25, 1.5, 1.75, 2.0, 2.5];
var status = false;
restart();

async function winnerFunction(winner,rates,winList){
  console.log(rates);
  const deleteBots = await HorseGame.deleteMany({ userId: "bot" });
  if (!deleteBots) console.log("error");
  console.log(winner);
  const horseGames = await HorseGame.find({
    selectedSide: winner,
  });
  console.log(horseGames);
  await History.create({
    winnerHorse: winner,
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
  if (horseGames.length > 0) {
    // for (let i = 0; i < horseGames.length + 1; i++) {
    //   if (horseGames.length === i) {
    //     //delete all
    //     await HorseGame.deleteMany({});
    //   } else {
    //     const user = await User.findOne({
    //       _id: horseGames[i].userId,
    //     });
    //     if (user) {
    //       user.deposit +=
    //         horseGames[i].betAmount * rates;
    //       user.save();
    //     }
    //   }
    // }
    horseGames.map(async (horseGame) => {
      const user = await User.findOne({ _id: horseGame.userId });
      if (user) {
        console.log(user.deposit, "user deposit");
        console.log(horseGame.betAmount, "bet amount");
        console.log(rates, "rates");
        user.deposit += horseGame.betAmount * rates;
        user.save();
      }
    });
    await HorseGame.deleteMany({});
  } else {
    await HorseGame.deleteMany({});
  }

}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  setTimeout(() => {
    io.emit("time", time);
    io.emit("status", status);
    io.emit("horse1Rate", rates[0]);
    io.emit("horse2Rate", rates[1]);
    io.emit("horse3Rate", rates[2]);
    io.emit("horse4Rate", rates[3]);
    io.emit("horse5Rate", rates[4]);
  }, 1000);
});

async function bot() {
  console.log("bot");
  const deleteBots = await HorseGame.deleteMany({ userId: "bot" });

  const time = 60;
  const maxBet = 75;
  const minBet = 10;
  const maxBetAmount = 100;
  const minBetAmount = 10;
  const horses = await HorsesModel.findOne({});

  const horse = [
    horses.horse1,
    horses.horse2,
    horses.horse3,
    horses.horse4,
    horses.horse5,
  ];

  const betAmount = Math.floor(Math.random() * (maxBet - minBet + 1) + minBet);
  for (let i = 0; i < betAmount; i++) {
    const betTime = Math.floor(Math.random() * (time * 1000 - 1000 + 1) + 1000);
    const selectedSide = horse[Math.floor(Math.random() * horse.length)];
    setTimeout(async () => {
      await HorseGame.create({
        userId: "bot",
        username: randomSymbol(8, "aA"),
        img: "https://cryptogameplace.com/images/users/default.jpg",
        betAmount: Math.floor(
          Math.random() * (maxBetAmount - minBetAmount + 1) + minBetAmount
        ),
        selectedSide: selectedSide,
      });
    }, betTime);
  }
}



async function game() {
  const horses = await HorsesModel.findOne({});
  status = true;
  io.emit("status", true);
  raceTime = 30 * 1000;
  horseStatus = [0, 0, 0, 0, 0];

  var race = setInterval( () => {
    raceTime -= 100;
    if (raceTime == 0) {
      clearInterval(race);
      wait();
    } else {
      const timer = ((30000 - raceTime) / 300) * 1;

      if (timer > 20 && timer < 21) {
        randomHorse();
      } else if (timer > 40 && timer < 41) {
        randomHorse();
      } else if (timer > 60 && timer < 61) {
        randomHorse();
      } else if (timer > 80 && timer < 81) {
        randomHorse();
      } else if (timer > 90 && timer < 91) {
        randomHorse();
      }

      const run1 = Math.random() * horse[0].percent + 1;
      const run2 = Math.random() * horse[1].percent + 1;
      const run3 = Math.random() * horse[2].percent + 1;
      const run4 = Math.random() * horse[3].percent + 1;
      const run5 = Math.random() * horse[4].percent + 1;

      horseStatus[0] += run1;
      horseStatus[1] += run2;
      horseStatus[2] += run3;
      horseStatus[3] += run4;
      horseStatus[4] += run5;

      const max = Math.max(
        horseStatus[0],
        horseStatus[1],
        horseStatus[2],
        horseStatus[3],
        horseStatus[4]
      );
      const percentValue = timer / max;

      const runner1 = horseStatus[0] * percentValue;
      const runner2 = horseStatus[1] * percentValue;
      const runner3 = horseStatus[2] * percentValue;
      const runner4 = horseStatus[3] * percentValue;
      const runner5 = horseStatus[4] * percentValue;

      const maxR = Math.max(runner1, runner2, runner3, runner4, runner5);
      const winList = [
        {
          name: horses.horse1,
          runner: runner1,
        },
        {
          name: horses.horse2,
          runner: runner2,
        },
        {
          name: horses.horse3,
          runner: runner3,
        },
        {
          name: horses.horse4,
          runner: runner4,
        },
        {
          name: horses.horse5,
          runner: runner5,
        },
      ].sort((a, b) => b.runner - a.runner);

      var winner = "";
      var value = 0;
      if (maxR > 99 && value == 0) {
        value = 1;
        if (maxR == runner1) {
          winner = { name: horses.horse1, id: 1 };
          console.log(winner);
          io.emit("winner", horses.horse1);
        } else if (maxR == runner2) {
          console.log(winner);
          winner = { name: horses.horse2, id: 2 };
          io.emit("winner", horses.horse2);
          console.log(winner);
        } else if (maxR == runner3) {
          winner = { name: horses.horse3, id: 3 };
          console.log(winner);
          io.emit("winner", horses.horse3);
        } else if (maxR == runner4) {
          winner = { name: horses.horse4, id: 4 };
          console.log(winner);
          io.emit("winner", horses.horse4);
        } else if (maxR == runner5) {
          winner = { name: horses.horse5, id: 5 };
          console.log(winner);
          io.emit("winner", horses.horse5);
        }
        var value = 1;
        if (value == 1) {
          winnerFunction(winner.name,rates[winner.id - 1],winList)
        }
        
        value = 2;
      }

      io.emit("horse1", runner1);
      io.emit("horse2", runner2);
      io.emit("horse3", runner3);
      io.emit("horse4", runner4);
      io.emit("horse5", runner5);
    }
  }, 100);
}

function wait() {
  setTimeout(() => {
    restart();
  }, 5000);
}



function randomHorse() {
  const random1 = Math.floor(Math.random() * 100) + 1;
  const random2 = Math.floor(Math.random() * 100) + 1;
  const random3 = Math.floor(Math.random() * 100) + 1;
  const random4 = Math.floor(Math.random() * 100) + 1;
  const random5 = Math.floor(Math.random() * 100) + 1;

  total = random1 + random2 + random3 + random4 + random5;

  const percent1 = parseFloat((random1 * 100).toFixed(2));
  const percent2 = parseFloat((random2 * 100).toFixed(2));
  const percent3 = parseFloat((random3 * 100).toFixed(2));
  const percent4 = parseFloat((random4 * 100).toFixed(2));
  const percent5 = parseFloat((random5 * 100).toFixed(2));

  const totalRate = percent1 + percent2 + percent3 + percent4 + percent5;

  const rate1 = (100 - percent1) / 25;
  const rate2 = (100 - percent2) / 25;
  const rate3 = (100 - percent3) / 25;
  const rate4 = (100 - percent4) / 25;
  const rate5 = (100 - percent5) / 25;

  horse = [
    {
      id: 1,
      percent: percent1,
      rate: rate1,
    },
    {
      id: 2,
      percent: percent2,
      rate: rate2,
    },
    {
      id: 3,
      percent: percent3,
      rate: rate3,
    },
    {
      id: 4,
      percent: percent4,
      rate: rate4,
    },
    {
      id: 5,
      percent: percent5,
      rate: rate5,
    },
  ];
}

function restart() {
  console.log("restart");
  bot();
  var value = 1;
  rates = rates.sort(() => Math.random() - 0.5);
  io.emit("horse1Rate", rates[0]);
  io.emit("horse2Rate", rates[1]);
  io.emit("horse3Rate", rates[2]);
  io.emit("horse4Rate", rates[3]);
  io.emit("horse5Rate", rates[4]);
  console.log(rates);

  status = false;
  io.emit("status", false);
  time = 60;
  randomHorse();

  io.emit("random", horse);

  var timer = setInterval(() => {
    time = time - 1;
    io.emit("time", time);

    if (time == 0) {
      clearInterval(timer);
      if (value == 1) {
        value = 0;
        game();
      }
    }
  }, 1000);
  console.log(time);
}

function randomSymbol(length, symbols) {
  var mask = "";
  if (symbols.indexOf("a") > -1) mask += "abcdefghijklmnopqrstuvwxyz";
  if (symbols.indexOf("A") > -1) mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (symbols.indexOf("0") > -1) mask += "0123456789";
  if (symbols.indexOf("#") > -1) mask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
  var result = "";

  for (var i = length; i > 0; --i) {
    result += mask[Math.floor(Math.random() * mask.length)];
  }
  return result;
}
horseStatus = [0, 0, 0, 0, 0];

server.listen(3002, () => {
  console.log("listening on *:3002");
});
