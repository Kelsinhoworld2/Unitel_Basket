import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function Home() {
  const [games, setGames] = useState([]);
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API}/games`);
        setGames(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [API]);

  return (
    <Layout>
      <div style={{ padding: "20px", color: "white" }}>
        <h1>Unitel Basket</h1>

        {games.length > 0 ? (
          games.map((game) => (
            <div key={game._id}>
              <p>
                {game.homeTeam} vs {game.awayTeam}
              </p>
            </div>
          ))
        ) : (
          <p>Carregando jogos...</p>
        )}
      </div>
    </Layout>
  );
}
