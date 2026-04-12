require('dotenv').config();
const Game = require("./models/Game");
const path = require('path');
const express = require('express');
const next = require('next');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./db');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 5500;


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

app.prepare().then(async () => {
  await connectDB();
const expressApp = express();

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

  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado", socket.id);
  });

  setInterval(() => simulateLiveScores(io), 10000);

  server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});
