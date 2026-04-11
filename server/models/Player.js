const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  position: { type: String, default: 'G' },
  photo: { type: String, default: '/player-avatar.svg' },
  ppg: { type: Number, default: 0 },
  apg: { type: Number, default: 0 },
  rpg: { type: Number, default: 0 },
  gamesPlayed: { type: Number, default: 0 },
});

module.exports = mongoose.models.Player || mongoose.model('Player', PlayerSchema);
