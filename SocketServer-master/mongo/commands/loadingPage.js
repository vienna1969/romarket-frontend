const GameHistoryModel = require('../roulleteHistoryModel.js');
const Game = require('../gameModel.js');


async function loadingData(){
    const gameHistory = await GameHistoryModel.find({},{winner:1}).sort({spinDate: -1}).limit(10)
    const winner100 = await GameHistoryModel.find({},{winner:1}).sort({spinDate: -1}).limit(100)
    const ct = winner100.filter((winner) => winner.winner === 'ct').length;
    const t = winner100.filter((winner) => winner.winner === 't').length;
    const dice = winner100.filter((winner) => winner.winner === 'dice').length;
    const games = await Game.find({})
    
    
    const data = {
        gameHistory,
        chance : {
            ct: ct,
            t: t,
            dice: dice,
        },
        games
    }
    return data;
}

module.exports = loadingData;