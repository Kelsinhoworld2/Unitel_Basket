
import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import LiveMatchCard from '../components/LiveMatchCard';
import GameCard from '../components/GameCard';
import PlayerCard from '../components/PlayerCard';
import LeagueLeaders from '../components/Dashboard/LeagueLeaders';



let socket;

export default function Home() {
  const [liveGames, setLiveGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [recentGames, setRecentGames] = useState([]);
  const [topPlayers, setTopPlayers] = useState([]);

  const highlightGame = useMemo(() => liveGames[0] || upcomingGames[0] || recentGames[0] || null, [liveGames, upcomingGames, recentGames]);

  const cardMotion = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: 'easeOut' }
  };

useEffect(() => {
 const load = async () => {
  try {
    const [liveRes, allRes, playersRes] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/live-games`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/games`),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/highlights`)
    ]);

    const games = allRes.data;

    setLiveGames(liveRes.data);
    setUpcomingGames(games.filter((game) => game.status === 'upcoming'));
    setRecentGames(games.filter((game) => game.status === 'finished').slice(-3).reverse());
    setTopPlayers(playersRes.data);

  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
};


  load();
}, []);

  useEffect(() => {
    socket = io();
    socket.emit('subscribeLive');
    socket.on('scoreUpdate', (payload) => {
      setLiveGames((prev) => prev.map((game) => (game._id === payload.gameId ? { ...game, homeScore: payload.homeScore, awayScore: payload.awayScore } : game)));
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Layout>
      <div className="bg-[#05070a] text-white">
        <div className="mb-10 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-white/50">Painel oficial</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-black uppercase italic tracking-tighter bg-gradient-to-r from-lime-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Unitel Basket
            </h1>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-white/70">
            Experiência broadcast de basquetebol com placar ao vivo, destaques do dia e ranking premium de jogadores.
          </p>
        </div>

        <div className="mb-8 overflow-x-auto rounded-sm border border-white/10 bg-[#111] p-4 shadow-2xl shadow-black/30">
          <div className="flex min-w-[780px] gap-4 text-xs font-black uppercase italic tracking-tighter text-white/80">
            {recentGames.length > 0 ? recentGames.map((game) => (
              <motion.div
                key={game._id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="rounded-sm border border-white/10 bg-[#111] px-4 py-3 hover:bg-[#FF6B00] hover:text-black transition-all"
              >
                <span>{game.homeTeam} {game.homeScore} - {game.awayScore} {game.awayTeam}</span>
              </motion.div>
            )) : (
              <div className="rounded-sm bg-[#111] px-4 py-3 text-white/60">Aguardando resultados recentes...</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-8 rounded-sm border border-white/10 bg-gradient-to-br from-black via-slate-950 to-[#111] p-6 shadow-2xl shadow-black/50 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,107,0,0.16),transparent_30%)] pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <motion.div
                className="inline-flex items-center rounded-full border border-[#FF6B00]/70 bg-[#FF6B00]/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.45em] text-[#FF6B00]"
                animate={{ scale: [1, 1.02, 1], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
              >
                UNITEL BASKET LIVE
              </motion.div>

              <div className="space-y-4">
                <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">Hero Broadcast</h2>
                <p className="max-w-2xl text-sm text-white/70">
                  Destaque ao vivo com visual de transmissão e foco no melhor do campeonato Unitel Basket.
                </p>
              </div>

              {highlightGame ? (
                <LiveMatchCard game={highlightGame} />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="rounded-3xl border border-white/10 bg-[#111] p-6 text-center text-white/70"
                >
                  Nenhum jogo disponível no momento.
                </motion.div>
              )}
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4 rounded-sm border border-white/10 bg-[#111] p-6 shadow-2xl shadow-black/30">
            <h2 className="text-xl font-black uppercase italic tracking-tighter text-[#FF6B00] mb-4">Leaderboard</h2>
            <div className="space-y-4">
              {topPlayers.slice(0, 5).map((player, index) => (
                <motion.div
                  key={player._id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 30px 60px rgba(255,107,0,0.22)' }}
                  className="flex items-center gap-4 rounded-sm border border-white/10 bg-[#121212] p-4"
                >
                  <span className="text-[#FF6B00] font-black">{index + 1}</span>
                  <PlayerCard player={player} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-sm border border-white/10 bg-[#111] p-6 shadow-xl shadow-black/30">
            <h2 className="text-xl font-black uppercase italic tracking-tighter text-[#FF6B00] mb-4">Próximos Jogos</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {upcomingGames.slice(0, 3).map((game, index) => (
                <motion.div
                  key={game._id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 30px 60px rgba(255,107,0,0.18)' }}
                  className="rounded-sm"
                >
                  <GameCard game={game} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-white/10 bg-[#161616] p-6 shadow-xl shadow-black/30">
            <h2 className="text-xl font-black uppercase italic tracking-tighter text-[#FF6B00] mb-4">Feed ao Vivo</h2>
            <div className="space-y-4">
              {liveGames.length > 0 ? (
                liveGames.map((game, index) => (
                  <motion.div
                    key={game._id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.04 }}
                    whileHover={{ scale: 1.02, boxShadow: '0 30px 60px rgba(255,107,0,0.18)' }}
                    className="rounded-sm"
                  >
                    <GameCard game={game} />
                  </motion.div>
                ))
              ) : (
                <p className="text-white/70">Nenhum jogo ao vivo no momento.</p>
              )}
            </div>
          </div>
        </div>

        <LeagueLeaders />
      </div>
    </Layout>
  );
  

}
