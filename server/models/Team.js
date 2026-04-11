const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, default: 'Luanda' },
  logo: { type: String, default: '/team-logo.svg' },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
});

module.exports = mongoose.models.Team || mongoose.model('Team', TeamSchema);
