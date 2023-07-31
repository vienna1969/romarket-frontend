const { Schema, model, models } = require('mongoose');
require('dotenv').config()

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

const GameHistory = new Schema({
    bets: {
        type: Object,
        required: true,
    },
    winner: {
        type: String,
        required: true,
    },
    spinDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
});


const GameHistoryModel = mongoose.model('GameHistory', GameHistory)


module.exports = GameHistoryModel;



