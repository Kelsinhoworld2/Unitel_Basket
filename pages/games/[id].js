import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../../components/Layout';

export default function GameDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const res = await axios.get(`/api/games/${id}`);
      setData(res.data);
    };
    fetch();
  }, [id]);

  if (!data) {
    return (
      <Layout>
        <p className="text-soft">Carregando jogo...</p>
      </Layout>
    );
  }

  const { game, stats } = data;

  return (
    <Layout>
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Detalhes do jogo</p>
        <h1 className="mt-3 text-3xl font-semibold">{game.homeTeam.name} vs {game.awayTeam.name}</h1>
        <p className="mt-3 text-sm text-soft">{new Date(game.date).toLocaleString('pt-BR')}</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-border bg-panel p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-soft">Placar</p>
              <h2 className="mt-2 text-4xl font-semibold text-white">{game.homeScore} - {game.awayScore}</h2>
            </div>
            <span className="rounded-full bg-accent/15 px-4 py-2 text-sm uppercase text-accent">{game.status}</span>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 text-center text-white">
            <div className="rounded-3xl bg-[#151d2f] p-5">
              <p className="text-sm text-soft">Casa</p>
              <p className="mt-3 text-lg font-semibold">{game.homeTeam.name}</p>
            </div>
            <div className="rounded-3xl bg-[#151d2f] p-5">
              <p className="text-sm text-soft">Visitante</p>
              <p className="mt-3 text-lg font-semibold">{game.awayTeam.name}</p>
            </div>
          </div>
          <div className="mt-6 rounded-3xl bg-[#121827] p-5 text-sm text-soft">
            <p><strong>Local:</strong> {game.venue}</p>
            <p className="mt-2"><strong>Destaque:</strong> {game.highlight}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-border bg-panel p-6">
            <h2 className="text-xl font-semibold">Estatísticas da partida</h2>
            <div className="mt-4 grid gap-3 text-sm text-soft">
              <p>Tempo real e atualizações constantes de pontuação.</p>
              <p>Assistências, ressaltos e bloqueios-chave serão atualizados conforme os dados do jogo.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-panel p-6">
            <h2 className="text-xl font-semibold">Estatísticas individuais</h2>
            <div className="mt-4 space-y-3">
              {stats.length ? stats.map((stat) => (
                <div key={stat._id} className="rounded-3xl bg-[#141d30] p-4">
                  <p className="font-semibold text-white">{stat.player.name}</p>
                  <div className="mt-2 grid grid-cols-4 gap-3 text-sm text-soft">
                    <span>PTS {stat.points}</span>
                    <span>AST {stat.assists}</span>
                    <span>REB {stat.rebounds}</span>
                    <span>MIN {stat.minutes}</span>
                  </div>
                </div>
              )) : <p className="text-soft">Nenhuma estatística registrada para esta partida.</p>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
