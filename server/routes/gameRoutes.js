const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Stat = require('../models/Stat');

// GET all games, optionally filtered by date
// Rota: /api/games/
router.get('/', async (req, res) => {
  try {
    const date = req.query.date ? new Date(req.query.date) : null;
    const filter = {};
    if (date) {
      filter.date = {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999)),
      };
    }
    const games = await Game.find(filter).populate('homeTeam awayTeam').sort({ date: 1 });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET live games
// Rota: /api/games/live-games
router.get('/live-games', async (req, res) => {
  try {
    const games = await Game.find({ status: 'live' }).populate('homeTeam awayTeam');
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET game by ID
// Rota: /api/games/:id (Deve vir por último para não confundir com /live-games)
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate('homeTeam awayTeam');
    if (!game) return res.status(404).json({ message: 'Jogo não encontrado' });
    const stats = await Stat.find({ game: game._id }).populate('player');
    res.json({ game, stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
