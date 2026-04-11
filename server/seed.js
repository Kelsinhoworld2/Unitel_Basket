require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const Team = require('./models/Team');
const Player = require('./models/Player');
const Game = require('./models/Game');
const Stat = require('./models/Stat');

const teamsData = [
  { name: 'Petro de Luanda', city: 'Luanda', wins: 18, losses: 4, points: 40, rank: 1 },
  { name: 'Interclube', city: 'Luanda', wins: 16, losses: 6, points: 38, rank: 2 },
  { name: '1º de Agosto', city: 'Luanda', wins: 14, losses: 8, points: 36, rank: 3 },
  { name: 'Primeiro de Agosto', city: 'Luanda', wins: 12, losses: 10, points: 34, rank: 4 },
];

const playerData = [
  { name: 'Carlos Morais', position: 'G', ppg: 21.4, apg: 5.2, rpg: 5.9 },
  { name: 'Raulzinho', position: 'G', ppg: 18.1, apg: 6.8, rpg: 3.4 },
  { name: 'Gerson Gonçalves', position: 'F', ppg: 16.2, apg: 4.0, rpg: 7.3 },
  { name: 'Aboubakar Gakou', position: 'C', ppg: 14.0, apg: 2.8, rpg: 8.6 },
  { name: 'Edson Ndoniema', position: 'F', ppg: 12.4, apg: 3.1, rpg: 6.2 },
  { name: 'Neto', position: 'G', ppg: 10.9, apg: 7.1, rpg: 4.7 },
];

const gameData = [
  { date: new Date(Date.now() - 1000 * 60 * 60 * 8), status: 'finished', homeScore: 82, awayScore: 76, venue: 'Pavilhão Multiusos' },
  { date: new Date(Date.now() - 1000 * 60 * 60 * 2), status: 'live', homeScore: 54, awayScore: 50, venue: 'Pavilhão do Zé Dú' },
  { date: new Date(Date.now() + 1000 * 60 * 60 * 4), status: 'upcoming', homeScore: 0, awayScore: 0, venue: 'Pavilhão da Cidadela' },
];

const runSeed = async () => {
  try {
    await connectDB();
    await Team.deleteMany();
    await Player.deleteMany();
    await Game.deleteMany();
    await Stat.deleteMany();

    const teams = await Team.insertMany(teamsData);
    const players = [];

    players.push(
      await Player.create({ ...playerData[0], team: teams[0]._id }),
      await Player.create({ ...playerData[1], team: teams[1]._id }),
      await Player.create({ ...playerData[2], team: teams[2]._id }),
      await Player.create({ ...playerData[3], team: teams[0]._id }),
      await Player.create({ ...playerData[4], team: teams[1]._id }),
      await Player.create({ ...playerData[5], team: teams[2]._id }),
    );

    const games = [];
    games.push(
      await Game.create({
        ...gameData[0],
        homeTeam: teams[0]._id,
        awayTeam: teams[1]._id,
        highlight: 'Gerson Gonçalves liderou com 28 pontos',
      }),
      await Game.create({
        ...gameData[1],
        homeTeam: teams[2]._id,
        awayTeam: teams[3]._id,
        highlight: 'Jogo acirrado com três minutos finais de pura emoção',
      }),
      await Game.create({
        ...gameData[2],
        homeTeam: teams[1]._id,
        awayTeam: teams[3]._id,
        highlight: 'Duelo turno com peso forte na tabela',
      }),
    );

    const stats = [
      { game: games[0]._id, player: players[0]._id, points: 28, assists: 6, rebounds: 4, steals: 2, blocks: 1, minutes: 34 },
      { game: games[0]._id, player: players[1]._id, points: 20, assists: 8, rebounds: 3, steals: 1, blocks: 0, minutes: 33 },
      { game: games[1]._id, player: players[2]._id, points: 22, assists: 4, rebounds: 9, steals: 1, blocks: 2, minutes: 36 },
      { game: games[1]._id, player: players[3]._id, points: 18, assists: 5, rebounds: 10, steals: 2, blocks: 1, minutes: 35 },
    ];

    await Stat.insertMany(stats);

    console.log('Seed completado com sucesso.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runSeed();
