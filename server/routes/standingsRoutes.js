const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const Player = require('../models/Player');

// ==========================================
// 1. HIGHLIGHTS (TOP PLAYERS)
// IMPORTANTE: Esta rota deve vir ANTES das rotas com parâmetros dinâmicos
// ==========================================
router.get('/highlights', async (req, res) => {
  try {
    console.log("A buscar highlights..."); // Debug no console do Render
    
    const players = await Player.find()
      .sort({ ppg: -1 })
      .limit(8)
      .populate('team');

    console.log(`Jogadores encontrados: ${players.length}`);
    res.json(players);
  } catch (error) {
    console.error("Erro em /highlights:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 2. STANDINGS (CLASSIFICAÇÃO)
// ==========================================
router.get('/', async (req, res) => {
  try {
    const standings = await Team.find().sort({ points: -1, wins: -1 });
    res.json(standings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
