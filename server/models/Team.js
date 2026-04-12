const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: String,
  city: String,
  wins: Number,
  losses: Number,
  points: Number,
  rank: Number
});

module.exports = mongoose.model("Team", TeamSchema);
