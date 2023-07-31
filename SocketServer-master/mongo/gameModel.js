const { Schema, model, models } = require('mongoose');
require('dotenv').config()


const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

const GameSchema = new Schema({
    userObject: {
        type: Object,
        required: true,
    },
    bet: {
        type: Number,
        required: true,
    },
    site: {
        type: String,
        required: true,
    }
});

const Game = mongoose.model('GameRoullete', GameSchema)

module.exports = Game;