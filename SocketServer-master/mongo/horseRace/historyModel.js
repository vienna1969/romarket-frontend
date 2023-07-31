const { Schema, model, models } = require("mongoose");
require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const HistorySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  winnerHorse: {
    type: String,
    required: true,
  },
  placements: {
    type: Array,
    line: {
      type: Number,
      required: true,
    },
    horse: {
      type: String,
      required: true,
    },
  },
});

const History =
  mongoose.models.History || mongoose.model("HorseHistory", HistorySchema);

module.exports = History;
