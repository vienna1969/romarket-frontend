const User = require("../userModel");

function addBalance(id,amount){
    User.findByIdAndUpdate(id, {$inc : {deposit: amount}}, {new: true}).then((user) => {
        console.log(user);
    }
    );

}

module.exports = addBalance;