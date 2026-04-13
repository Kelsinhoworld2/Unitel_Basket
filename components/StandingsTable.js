import { useEffect, useState } from 'react';
import axios from 'axios';
import StandingsTable from '../components/StandingsTable';

export default function HomePage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const res = await axios.get(
          'https://unitel-basket-api.onrender.com/api/standings'
        );

        setTeams(res.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  return (
    <main className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">
        Classificação Unitel Basket
      </h1>

      {loading ? (
        <p>A carregar tabela...</p>
      ) : (
        <StandingsTable teams={teams} />
      )}
    </main>
  );
}
