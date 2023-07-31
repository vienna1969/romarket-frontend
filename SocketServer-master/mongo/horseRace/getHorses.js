const HorsesModel = require('./horseNames');
async function getHorses(){
    const data = await HorsesModel.find({})
    return data[0];
}

module.exports = getHorses;