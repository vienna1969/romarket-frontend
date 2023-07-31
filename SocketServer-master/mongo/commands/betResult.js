const Game = require("../gameModel");
const addBalance = require("./addBalance");
const historyAdd = require("./historyAdd");

async function betResult(win){
    console.log(win);
    const data = await Game.find({  "userObject.id": { $ne: 0 }, site: win });

    data.forEach( (game) => {
        var winBalance = 0;
        if(win === 'dice'){
            winBalance = game.bet * 14;
        }
        else{
            winBalance = game.bet * 2;
        }
        
        addBalance(game.userObject.id, winBalance);
        
    })
    // add Game history
    const gameHistory = await Game.find({})
    historyAdd(gameHistory, win);
    const game = Game.deleteMany({}).then((game) => {
        console.log(game);
    });
}

module.exports = betResult;