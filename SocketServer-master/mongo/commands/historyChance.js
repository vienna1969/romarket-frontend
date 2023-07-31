const GameHistoryModel = require('../roulleteHistoryModel.js');
const Game = require('../gameModel.js');


async function historyChance(){
    const winner100 = await GameHistoryModel.find({},{winner:1}).sort({spinDate: -1}).limit(100)
    const ct = winner100.filter((winner) => winner.winner === 'ct').length;
    const t = winner100.filter((winner) => winner.winner === 't').length;
    const dice = winner100.filter((winner) => winner.winner === 'dice').length;
    console.log(ct, t, dice);
    const data = {
        chance : {
            ct: ct,
            t: t,
            dice: dice,
        },
    }
    return data;
}

module.exports = historyChance;