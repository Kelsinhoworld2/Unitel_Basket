const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema({
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  points: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  rebounds: { type: Number, default: 0 },
  steals: { type: Number, default: 0 },
  blocks: { type: Number, default: 0 },
  minutes: { type: Number, default: 0 },
});

module.exports = mongoose.models.Stat || mongoose.model('Stat', StatSchema);
