import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../../components/Layout';

export default function PlayerDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const res = await axios.get(`/api/players/${id}`);
      setPlayerData(res.data);
    };
    fetch();
  }, [id]);

  if (!playerData) {
    return (
      <Layout>
        <p className="text-soft">Carregando jogador...</p>
      </Layout>
    );
  }

  const { player, stats } = playerData;

  return (
    <Layout>
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Perfil do jogador</p>
        <h1 className="mt-3 text-3xl font-semibold">{player.name}</h1>
        <p className="mt-2 text-sm text-soft">{player.position} • {player.team?.name}</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
        <div className="rounded-3xl border border-border bg-panel p-6">
          <h2 className="text-lg font-semibold">Métricas principais</h2>
          <div className="mt-5 grid gap-4 text-sm text-soft">
            <div className="rounded-3xl bg-[#121826] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-soft">Pontos por jogo</p>
              <p className="mt-2 text-4xl font-semibold text-white">{player.ppg}</p>
            </div>
            <div className="rounded-3xl bg-[#121826] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-soft">Assistências</p>
              <p className="mt-2 text-4xl font-semibold text-white">{player.apg}</p>
            </div>
            <div className="rounded-3xl bg-[#121826] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-soft">Ressaltos</p>
              <p className="mt-2 text-4xl font-semibold text-white">{player.rpg}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-panel p-6">
          <h2 className="text-lg font-semibold">Jogador da semana</h2>
          <p className="mt-4 text-sm text-soft">O desempenho mais recente do atleta em partidas oficiais.</p>
          <div className="mt-5 space-y-3">
            {stats.length ? stats.map((stat) => (
              <div key={stat._id} className="rounded-3xl bg-[#141d30] p-4">
                <p className="font-semibold text-white">Partida em {new Date(stat.game.date).toLocaleDateString('pt-BR')}</p>
                <div className="mt-3 grid grid-cols-3 gap-3 text-sm text-soft">
                  <span>PTS {stat.points}</span>
                  <span>AST {stat.assists}</span>
                  <span>REB {stat.rebounds}</span>
                </div>
              </div>
            )) : <p className="text-soft">Sem estatísticas registradas.</p>}
          </div>
        </div>
      </div>
    </Layout>
  );
}
