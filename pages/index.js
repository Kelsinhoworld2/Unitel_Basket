import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://unitel-basket-api.onrender.com/api";

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API}/games`);
        setGames(res.data || []);
      } catch (err) {
        console.error("Erro ao carregar jogos:", err);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [API]);

  return (
    <Layout>
      <div style={{ padding: "20px", color: "white" }}>
        <h1>Unitel Basket</h1>

        {loading ? (
          <p>Carregando jogos...</p>
        ) : games.length > 0 ? (
          games.map((game) => (
            <div key={game._id}>
              <p>
                {/* 🔥 FIX PRINCIPAL AQUI */}
                {game.homeTeam?.name || game.homeTeam} vs{" "}
                {game.awayTeam?.name || game.awayTeam}
              </p>

              <small>
                {game.homeScore ?? 0} - {game.awayScore ?? 0}
              </small>
            </div>
          ))
        ) : (
          <p>Nenhum jogo encontrado</p>
        )}
      </div>
    </Layout>
  );
}
