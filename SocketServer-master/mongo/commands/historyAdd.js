const GameHistoryModel = require('../roulleteHistoryModel.js');

async function historyAdd(bets, winner){
    const game = new GameHistoryModel({
        bets: bets,
        winner: winner,
    });
    game.save();
}

module.exports = historyAdd;