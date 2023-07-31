const { Schema, model, models } = require("mongoose");
require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const HorsesModel =
  models.Horses ||
  model(
    "Horses",
    new Schema({
      horse1: String,
      horse2: String,
      horse3: String,
      horse4: String,
      horse5: String,
      inputs: Object,
    })
  );

module.exports = HorsesModel;
