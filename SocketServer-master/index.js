const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const crypto = require("crypto");
const verifyJwtToken = require("./jwt");
const betJoinRoullete = require("./mongo/commands/betJoinRoullete");
const addBotUser = require("./mongo/commands/addBotUser");
const betResult = require("./mongo/commands/betResult");
const loadingData = require("./mongo/commands/loadingPage");
const historyChance = require("./mongo/commands/historyChance");
const balance = require("./mongo/commands/balance");
//SETTİNGS
let saniye = 20;
let donusBekleme = 8;
let sure = 12;

let sayac = saniye * 1000;
let start = false;

let bot = true;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", async (socket) => {
    const data = await loadingData()
    socket.emit("join", data);

  socket.on('bot', async (data) => {
    const dataa = await addBotUser(1,'t');
    io.emit("game", dataa);
  })

  
  socket.on("bet", (data) => {
    if(start){
      socket.emit("bet", "Oyun başlamadı.");
      return;
    }
    verifyJwtToken(data.token).then(async (payload) => {
      if(payload){
        const dataa = await betJoinRoullete(payload._id, data.bet, data.site);
          socket.emit("bet", dataa.data);
          io.emit("game", dataa.game);
      }
      else{
        socket.emit("bet", "Token geçersiz.");
      }
    });
  }); 

  socket.on("balance", (data) => {
    console.log("BABABAB")
    verifyJwtToken(data.token).then(async (payload) => {
      if(payload){
        const balancea = await balance(payload._id);
        socket.emit("balance", balancea);
      }
      else{
        socket.emit("balance", null);
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("Bağlantı sonlandırıldı.");
  });
});

const test2 = () => {
  io.emit("start", false);
  start = false;
  var sayar = setInterval(function () {
    sayac -= 100;
    io.emit("sayac", sayac);
    if (sayac <= 0) {
      clearInterval(sayar);
      sayac = saniye * 1000;
      test();
    }
  }, 100);
};

test2();

function botJoin() {
  const botCountDelay = sure * 1000 / 20;
  var sayar = setInterval(function () {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const randomTime = Math.floor(Math.random() * 1000) + 1;
  const randomSite = Math.floor(Math.random() * 3) + 1;
  setTimeout(async () => {
      if(start) {
        clearInterval(sayar);
        return;
      }
      
      const data = await addBotUser(randomNumber, randomSite == 1 ? "ct" : randomSite == 2 ? "t" : "dice");
      io.emit("game", data);

  }, randomTime);
  }, botCountDelay);

}

function test() {
  const randomNumber = crypto.randomInt(0, 100, (err, n) => {
    if (err) throw err;
    io.emit("start", true);
    start = true;
    io.emit("randomNumber", n);

    setTimeout(async () => {
    let win = "";
    if(n == 20){
      win = "dice"
    }
    else if(n == 35){
      win = "dice"
    }
    else if(n == 50){
      win = "dice"
    }
    else if(n == 65){
      win = "dice"
    }
    else if(n % 2 == 0){
      win = "t"
    }
    else{
      win = "ct"
    }
    betResult(win);

    io.emit("betOk", win);
    const history = await historyChance()
    io.emit("history",history)
    }, donusBekleme * 1000);
  });



  setTimeout(() => {
    io.emit("clear",true)
    test2();
    botJoin();
  }, sure * 1000);
}

server.listen(3003, () => {
  console.log("Sunucu dinleniyor...");
});

