const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// GET players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find().populate('team');
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
