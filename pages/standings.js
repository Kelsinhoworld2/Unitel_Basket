import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import StandingsTable from '../components/StandingsTable';

export default function Standings() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        console.log("API URL:", apiUrl);

        const res = await axios.get(
          `${apiUrl}/api/standings`
        );

        setTeams(res.data);
      } catch (error) {
        console.error("Erro ao carregar classificações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  return (
    <Layout>
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">
          Classificação
        </p>

        <h1 className="mt-3 text-3xl font-semibold">
          Tabela do campeonato
        </h1>

        <p className="mt-4 max-w-2xl text-sm text-soft">
          Acompanhe a tabela oficial do Unitel Basket com vitórias, derrotas e pontuação total.
        </p>
      </div>

      {loading ? (
        <p className="text-soft">A carregar classificação...</p>
      ) : (
        <StandingsTable teams={teams} />
      )}
    </Layout>
  );
}
