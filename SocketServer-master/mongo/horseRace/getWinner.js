const HorseGame = require('./gameModel');
async function getWinner(horseName){
    const winner = await HorseGame.find({userId:{$ne:"bot"},selectedSide:horseName})
    
    return winner;
}

module.exports = getWinner;