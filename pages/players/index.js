import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import PlayerCard from '../../components/PlayerCard';

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('/api/players');
      setPlayers(res.data);
    };
    fetch();
  }, []);

  const bestPlayers = players.sort((a, b) => b.ppg - a.ppg).slice(0, 6);

  return (
    
    <Layout>
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Jogadores</p>
        <h1 className="mt-3 text-3xl font-semibold">Perfil dos atletas</h1>
        <p className="mt-4 max-w-2xl text-sm text-soft">
          Veja o ranking de pontuação, assistências e ressaltos dos principais jogadores do Unitel Basket.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {bestPlayers.map((player) => (
          <PlayerCard key={player._id} player={player} />
        ))}
      </div>
    </Layout>
  );
}
