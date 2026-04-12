const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const Stat = require('../models/Stat');

// GET all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find().populate('team');
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET player by ID
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate('team');
    if (!player) return res.status(404).json({ message: 'Jogador não encontrado' });
    const stats = await Stat.find({ player: player._id }).populate('game');
    res.json({ player, stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;