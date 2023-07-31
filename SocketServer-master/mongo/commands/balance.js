const User = require("../userModel");

async function balance(id){
    const balance = await User.findById(id).then((user) => {
        return user.deposit;
    });
   return balance;
}

module.exports = balance;