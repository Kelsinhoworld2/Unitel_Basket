console.log('Iniciando servidor Node.js...');
console.log('NODE_ENV =', process.env.NODE_ENV);

const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./db');
const Game = require("./models/Game");

const dev = process.env.NODE_ENV !== 'production';

if (dev) {
  require('dotenv').config();
}

const PORT = process.env.PORT || 10000;

// Next.js (só em dev)
let app, handle;
if (dev) {
  const next = require('next');
  app = next({ dev });
  handle = app.getRequestHandler();
}

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

// 🔥 Inicialização do servidor
const startServer = async (expressApp) => {
  const server = http.createServer(expressApp);

  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);
  });

  setInterval(() => simulateLiveScores(io), 10000);

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
  });
};

// 🔥 ROTAS CENTRALIZADAS (CORRIGIDO PARA OS TEUS NOMES REAIS)
const applyRoutes = (expressApp) => {
  expressApp.use('/api/teams', require('./routes/teamRoutes'));

  // ✅ CORRETO (teu ficheiro real)
  expressApp.use('/api/players', require('./routes/playerRoutes.js'));

  expressApp.use('/api/games', require('./routes/gameRoutes'));
  expressApp.use('/api/standings', require('./routes/standingsRoutes'));
  //expressApp.use('/api/highlights', require('./routes/highlights'));

  // Health check
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
      database: dbMap[dbState] || 'unknown',
      time: new Date().toISOString()
    });
  });
};

// 🔥 PRODUÇÃO (Render)
if (!dev) {
  const expressApp = express();

  async function runProduction() {
    await connectDB();

    expressApp.use(cors({ origin: "*" }));
    expressApp.use(express.json());
    expressApp.use(express.static(path.join(__dirname, '..', 'public')));

    applyRoutes(expressApp);

    await startServer(expressApp);
  }

  runProduction().catch((err) => {
    console.error('Erro ao iniciar produção:', err);
    process.exit(1);
  });

} else {
  // 🔥 DESENVOLVIMENTO
  app.prepare().then(async () => {
    await connectDB();

    const expressApp = express();

    expressApp.use(cors({ origin: "*" }));
    expressApp.use(express.json());
    expressApp.use(express.static(path.join(__dirname, '..', 'public')));

    applyRoutes(expressApp);

    expressApp.all("*", (req, res) => {
      return handle(req, res);
    });

    await startServer(expressApp);

  }).catch((err) => {
    console.error('Erro ao iniciar dev:', err);
    process.exit(1);
  });
}
