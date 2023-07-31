const User = require("../userModel");
const Game = require("../gameModel");
const balance = require("./balance");

async function betJoinRoullete(id,bet,site){
    console.log(id);
    const balancea = await balance(id);
    // console.log(balancea);
    if(balancea >= bet){
        const balancee = balancea - bet;
        const user = await User.findByIdAndUpdate(id, {deposit: balancee}, {new: true});
        const data = {
            balance: user.deposit,
            status: true,
        }
        const game = new Game({
            userObject: {
                id: user._id,
                username: user.username,
                img: user.img,
            },
            bet: bet,
            site: site,
        });
        game.save();

        const object = {
            data,
            game,
        }

        return object;
    }
    else{
        const balancea = await balance(id);
        const data = {
            balance: balancea,
            status: false,
        }
        const game = {
        }

        const object = {
            data,
            game,
        }

        return object;
    }
}

module.exports = betJoinRoullete;