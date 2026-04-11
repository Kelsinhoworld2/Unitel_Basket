import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import GameCard from '../../components/GameCard';

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const query = filterDate ? `?date=${filterDate}` : '';
      const res = await axios.get(`/api/games${query}`);
      setGames(res.data);
    };
    fetch();
  }, [filterDate]);

  const liveGames = games.filter((game) => game.status === 'live');
  const upcomingGames = games.filter((game) => game.status === 'upcoming');
  const finishedGames = games.filter((game) => game.status === 'finished');

  return (
    <Layout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-accent">Jogos</p>
          <h1 className="mt-3 text-3xl font-semibold">Calendário de partidas</h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-soft">Filtrar por dia:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="rounded-3xl border border-border bg-[#0f1726] px-4 py-2 text-sm text-white outline-none transition focus:border-accent"
          />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold">Ao vivo</h2>
          <div className="mt-4 grid gap-4">{liveGames.length ? liveGames.map((game) => <GameCard key={game._id} game={game} />) : <p className="text-soft">Nenhum jogo ao vivo.</p>}</div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Próximos</h2>
          <div className="mt-4 grid gap-4">{upcomingGames.length ? upcomingGames.map((game) => <GameCard key={game._id} game={game} />) : <p className="text-soft">Sem jogos agendados.</p>}</div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Finalizados</h2>
          <div className="mt-4 grid gap-4">{finishedGames.length ? finishedGames.map((game) => <GameCard key={game._id} game={game} />) : <p className="text-soft">Nenhum resultado encontrado.</p>}</div>
        </section>
      </div>
    </Layout>
  );
}
