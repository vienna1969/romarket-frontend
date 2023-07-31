const axios = require("axios");
const Game = require("../gameModel");


async function addBotUser(betAmount,site){
    // axios.get("https://randomuser.me/api/").then((res) => {
    //     const user = res.data.results[0];
    //     const username = user.login.username;
    //     const img = user.picture.thumbnail;
    // const game = new Game({
    //     userObject: {
    //         id: 0,
    //         username: username,
    //         img: img,
    //     },
    //     bet: betAmount,
    //     site: site,
    // });
    // console.log(game);
    // const data = game;
    // game.save();
    // return data;
    // })
    const data = await axios.get("https://randomuser.me/api/")
    const user = data.data.results[0];
    const username = user.login.username;
    const img = user.picture.thumbnail;
    const game = new Game({
        userObject: {
            id: 0,
            username: username,
            img: img,
        },
        bet: betAmount,
        site: site,
    });
    const dataa = game;
    game.save();
    return dataa;

}

module.exports = addBotUser;