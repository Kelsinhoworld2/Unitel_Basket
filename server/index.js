require('dotenv').config();
const Game = require("./models/Game");
const path = require('path');
const express = require('express');
const cors = require("cors");
const next = require('next');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./db');

const PORT = process.env.PORT || 5500;
const dev = process.env.NODE_ENV !== 'production';

// Initialize Next.js only in development
let app, handle;
if (dev) {
  app = next({ dev });
  handle = app.getRequestHandler();
}

const simulateLiveScores = async (io) => {
  const liveGames = await Game.find({ status: 'live' }).populate('homeTeam awayTeam');
  liveGames.forEach(async (game) => {
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
  });
};

const createApiRoutes = (server) => {
  // Routes moved to separate files
};

const startServer = async (expressApp, server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado", socket.id);
  });

  setInterval(() => simulateLiveScores(io), 10000);

  server.listen(PORT, () => {
    console.log(`Servidor rodando em porta ${PORT}`);
  });
};

// Production mode: Express only
if (!dev) {
  const expressApp = express();
  
  async function runProduction() {
    await connectDB();
    
    expressApp.use(cors({ origin: "*" }));
    expressApp.use(express.json());
    expressApp.use(express.static(path.join(__dirname, '..', 'public')));

    // 🔥 ROTAS API
    expressApp.use('/api/teams', require('./routes/teamRoutes'));
    expressApp.use('/api/players', require('./routes/playerRoutes'));
    expressApp.use('/api/games', require('./routes/gameRoutes'));
    expressApp.use('/api', require('./routes/standingsRoutes'));

    // Health check endpoint
    expressApp.get('/health', (req, res) => {
      res.json({ status: 'ok', env: 'production' });
    });

    const server = http.createServer(expressApp);
    await startServer(expressApp, server);
  }
  
  runProduction().catch(error => {
    console.error('Erro ao iniciar servidor em produção:', error);
    process.exit(1);
  });
} else {
  // Development mode: Next.js + Express
  app.prepare().then(async () => {
    await connectDB();
    const expressApp = express();

    expressApp.use(cors({ origin: "*" }));
    expressApp.use(express.json());
    expressApp.use(express.static(path.join(__dirname, '..', 'public')));

    // 🔥 ROTAS API
    expressApp.use('/api/teams', require('./routes/teamRoutes'));
    expressApp.use('/api/players', require('./routes/playerRoutes'));
    expressApp.use('/api/games', require('./routes/gameRoutes'));
    expressApp.use('/api', require('./routes/standingsRoutes'));

    expressApp.all("*", (req, res) => {
      return handle(req, res);
    });

    const server = http.createServer(expressApp);
    await startServer(expressApp, server);
  }).catch(error => {
    console.error('Erro ao iniciar servidor em desenvolvimento:', error);
    process.exit(1);
  });
}
