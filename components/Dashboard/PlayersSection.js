import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlayerSection = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchStandings = async () => {
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://unitel-basket-api.onrender.com/api";

      const res = await axios.get(`${apiUrl}/standings`);

      setTeams(res.data || []);
    } catch (error) {
      console.error("Erro ao carregar classificações:", error);
      setTeams([]);
    }
  };

  fetchStandings();
}, []);

  if (loading) return <p>Carregando destaques...</p>;

  return (
    <section className="player-highlights">
      <h2>Destaques da Unitel Basket</h2>
      <div className="player-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {players.map((player) => (
          <div key={player._id} className="player-card" style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
            <img src={player.photo || '/default-avatar.png'} alt={player.name} style={{ width: '100%' }} />
            <h3>{player.name}</h3>
            <p>PPG: {player.ppg}</p>
            <small>{player.team?.name || 'Equipa desconhecida'}</small>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlayerSection;
