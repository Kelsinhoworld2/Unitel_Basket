const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  homeScore: { type: Number, default: 0 },
  awayScore: { type: Number, default: 0 },
  status: { type: String, enum: ['upcoming', 'live', 'finished'], default: 'upcoming' },
  venue: { type: String, default: 'Pavilhão' },
  highlight: { type: String, default: '' },
});

module.exports = mongoose.models.Game || mongoose.model('Game', GameSchema);
