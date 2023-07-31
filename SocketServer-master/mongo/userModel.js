const { Schema, model, models } = require("mongoose");
require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  pass: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  deposit: {
    type: Number,
    required: false,
    default: 0,
  },
  img: {
    type: String,
    required: true,
    default: "https://roulette.cryptogameplace.com/images/users/default.jpg",
  },
  admin: {
    type: Boolean,
    required: false,
    default: false,
  },
  newPassToken: {
    type: String,
    required: false,
    default: "",
  },
  maticBalance: {
    type: Number,
    required: false,
    default: 0,
  },
  walletAddress: {
    type: String,
    required: true,
    default: "",
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const User = models.User || model("User", UserSchema);

module.exports = User;
