const getHorses = require('./getHorses.js');
const getWinner = require('./getWinner.js');
const addBalance = require('../commands/addBalance.js');
const HorseGame = require('./gameModel');
async function betDagit(bet,carpan){
    const data = await getHorses()
    const winner = data[`horse${bet+1}`]
    console.log(winner)
    const winnerData = await getWinner(winner)    
    winnerData.forEach(async (winner) => {
        console.log(winner.betAmount)
        console.log(carpan)
        const winBalance = winner.betAmount * carpan;
        console.log(winBalance)
        addBalance(winner.userId, winBalance);
    })
    HorseGame.deleteMany({}).then((game) => {
        console.log("deleted");
    });
    
}

module.exports = betDagit;