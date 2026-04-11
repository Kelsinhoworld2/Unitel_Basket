import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Layout from '../components/Layout';
import LiveMatchCard from '../components/LiveMatchCard';
import GameCard from '../components/GameCard';
import PlayerCard from '../components/PlayerCard';

let socket;

export default function Home() {
  const [liveGames, setLiveGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [recentGames, setRecentGames] = useState([]);
  const [topPlayers, setTopPlayers] = useState([]);

  const highlightGame = useMemo(() => liveGames[0] || upcomingGames[0] || recentGames[0] || null, [liveGames, upcomingGames, recentGames]);

  useEffect(() => {
    const load = async () => {
      const [liveRes, allRes, playersRes] = await Promise.all([
        axios.get('/api/live-games'),
        axios.get('/api/games'),
        axios.get('/api/highlights'),
      ]);
      const games = allRes.data;
      setLiveGames(liveRes.data);
      setUpcomingGames(games.filter((game) => game.status === 'upcoming'));
      setRecentGames(games.filter((game) => game.status === 'finished').slice(-3).reverse());
      setTopPlayers(playersRes.data);
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
      <div className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Unitel Basket</p>
          <h1 className="mt-3 text-4xl font-semibold">Painel de estatísticas do campeonato</h1>
          <p className="mt-4 max-w-2xl text-sm text-soft">
            Acompanhe jogos ao vivo, próximos confrontos, resultados e o ranking dos principais jogadores do campeonato angolano.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-panel px-6 py-5 text-right">
          <p className="text-sm uppercase text-soft">Jogadores em destaque</p>
          <p className="mt-2 text-3xl font-semibold text-white">{topPlayers[0]?.name || 'Carregando...'}</p>
          <p className="text-sm text-soft">Pontuação média {topPlayers[0]?.ppg || '--'} PPG</p>
        </div>
      </div>

      {highlightGame ? <LiveMatchCard game={highlightGame} /> : null}

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Próximos jogos</h2>
              <p className="text-sm text-soft">Veja os confrontos agendados e acompanhe o calendário.</p>
            </div>
          </div>
          <div className="grid gap-4">
            {upcomingGames.slice(0, 3).map((game) => (
              <GameCard key={game._id} game={game} />
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold">Melhores jogadores</h2>
            <p className="text-sm text-soft">Ranking dos atletas mais impactantes do campeonato.</p>
          </div>
          <div className="grid gap-4">
            {topPlayers.slice(0, 4).map((player) => (
              <PlayerCard key={player._id} player={player} />
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-border bg-panel p-6">
          <h2 className="text-xl font-semibold">Resultados recentes</h2>
          <div className="mt-5 space-y-4">
            {recentGames.map((game) => (
              <GameCard key={game._id} game={game} />
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-panel p-6">
          <h2 className="text-xl font-semibold">Feed ao vivo</h2>
          <p className="mt-2 text-sm text-soft">As pontuações serão atualizadas automaticamente.</p>
          <div className="mt-5 space-y-4">
            {liveGames.length > 0 ? (
              liveGames.map((game) => <GameCard key={game._id} game={game} />)
            ) : (
              <p className="text-sm text-soft">Nenhum jogo ao vivo no momento.</p>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
