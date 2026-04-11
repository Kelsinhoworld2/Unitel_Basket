import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import StandingsTable from '../components/StandingsTable';

export default function Standings() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('/api/standings');
      setTeams(res.data);
    };
    fetch();
  }, []);

  return (
    <Layout>
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Classificação</p>
        <h1 className="mt-3 text-3xl font-semibold">Tabela do campeonato</h1>
        <p className="mt-4 max-w-2xl text-sm text-soft">
          Acompanhe a tabela oficial do Unitel Basket com vitórias, derrotas e pontuação total.
        </p>
      </div>
      <StandingsTable teams={teams} />
    </Layout>
  );
}
