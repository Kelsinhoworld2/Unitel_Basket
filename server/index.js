require('dotenv').config();
const path = require('path');
const express = require('express');
const next = require('next');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./db');
const Team = require('./models/Team');
const Player = require('./models/Player');
const Game = require('./models/Game');
const Stat = require('./models/Stat');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = parseInt(process.env.PORT, 10) || 3000;

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
  server.get('/api/teams', async (req, res) => {
    const teams = await Team.find().sort({ rank: 1 });
    res.json(teams);
  });

  server.get('/api/players', async (req, res) => {
    const players = await Player.find().populate('team');
    res.json(players);
  });

  server.get('/api/players/:id', async (req, res) => {
    const player = await Player.findById(req.params.id).populate('team');
    if (!player) return res.status(404).json({ message: 'Jogador não encontrado' });
    const stats = await Stat.find({ player: player._id }).populate('game');
    res.json({ player, stats });
  });

  server.get('/api/games', async (req, res) => {
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
  });

  server.get('/api/games/:id', async (req, res) => {
    const game = await Game.findById(req.params.id).populate('homeTeam awayTeam');
    if (!game) return res.status(404).json({ message: 'Jogo não encontrado' });
    const stats = await Stat.find({ game: game._id }).populate('player');
    res.json({ game, stats });
  });

  server.get('/api/standings', async (req, res) => {
    const standings = await Team.find().sort({ points: -1, wins: -1 });
    res.json(standings);
  });

  server.get('/api/highlights', async (req, res) => {
    const players = await Player.find().sort({ ppg: -1 }).limit(8).populate('team');
    res.json(players);
  });

  server.get('/api/live-games', async (req, res) => {
    const games = await Game.find({ status: 'live' }).populate('homeTeam awayTeam');
    res.json(games);
  });
};

app.prepare().then(async () => {
  await connectDB();

  const expressApp = express();
  expressApp.use(express.json());
  expressApp.use(express.static(path.join(__dirname, '..', 'public')));

  createApiRoutes(expressApp);

  expressApp.all('*', (req, res) => {
    return handle(req, res);
  });

  const server = http.createServer(expressApp);
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('Cliente conectado', socket.id);
    socket.on('subscribeLive', () => {
      socket.emit('message', 'Conectado ao feed ao vivo');
    });
  });

  setInterval(() => simulateLiveScores(io), 10000);

  server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});
