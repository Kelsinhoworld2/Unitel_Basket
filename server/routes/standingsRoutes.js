const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const Player = require('../models/Player');

// GET standings
router.get('/standings', async (req, res) => {
  try {
    const standings = await Team.find().sort({ points: -1, wins: -1 });
    res.json(standings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET highlights (top players)
router.get('/highlights', async (req, res) => {
  try {
    const players = await Player.find().sort({ ppg: -1 }).limit(8).populate('team');
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;