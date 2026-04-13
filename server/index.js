const express = require('express');
const cors = require("cors");
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const { Server } = require('socket.io');

const connectDB = require('./db');
const Game = require("./models/Game");

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 10000;

if (dev) require('dotenv').config();

// 🔥 Simulação de jogos ao vivo
const simulateLiveScores = async (io) => {
  const liveGames = await Game.find({ status: 'live' }).populate('homeTeam awayTeam');

  for (const game of liveGames) {
    const homeDelta = Math.floor(Math.random() * 3);
    const awayDelta = Math.floor(Math.random() * 3);

    game.homeScore += homeDelta;
    game.awayScore += awayDelta;

    await game.save();

    io.emit('scoreUpdate', {
      gameId: game._id,
      homeScore: game.homeScore,
      awayScore: game.awayScore,
      status: game.status,
      homeTeam: game.homeTeam.name,
      awayTeam: game.awayTeam.name,
    });
  }
};

// 🔥 SERVER START
const startServer = (expressApp) => {
  const server = http.createServer(expressApp);

  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);
  });

  setInterval(() => simulateLiveScores(io), 10000);

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em ${PORT}`);
  });
};

// 🔥 ROUTES
const applyRoutes = (expressApp) => {

  // 🔥 ROOT FIX (NÃO MAIS "Cannot GET /")
  expressApp.get('/', (req, res) => {
    res.json({
      status: "Unitel Basket API online 🚀",
      endpoints: {
        players: "/api/players",
        games: "/api/games",
        standings: "/api/standings",
        highlights: "/api/highlights"
      }
    });
  });

  expressApp.use('/api/players', require('./routes/playerRoutes.js'));
  expressApp.use('/api/games', require('./routes/gameRoutes'));
  expressApp.use('/api/standings', require('./routes/standingsRoutes'));

  // ⚠️ highlights removido temporariamente (evita crash)
  // expressApp.use('/api/highlights', require('./routes/highlights'));

  expressApp.get('/health', (req, res) => {
    const dbState = mongoose.connection.readyState;

    const dbMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    res.json({
      status: 'ok',
      env: process.env.NODE_ENV,
      database: dbMap[dbState],
      time: new Date().toISOString()
    });
  });
};

// 🔥 APP START
const expressApp = express();

expressApp.use(cors({ origin: "*" }));
expressApp.use(express.json());
expressApp.use(express.static(path.join(__dirname, '..', 'public')));

applyRoutes(expressApp);

if (!dev) {
  connectDB().then(() => {
    startServer(expressApp);
  }).catch(err => {
    console.error("Erro produção:", err);
    process.exit(1);
  });
} else {
  connectDB().then(() => {
    startServer(expressApp);
  });
}
