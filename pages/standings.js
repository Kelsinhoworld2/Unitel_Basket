import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import StandingsTable from '../components/StandingsTable';

export default function Standings() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        // Pega a URL do Render configurada na Vercel
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        
        // Faz a chamada para o backend correto
        const res = await axios.get(`${apiUrl}/api/standings`);
        
        // Atualiza o estado com os dados recebidos
        setTeams(res.data);
      } catch (error) {
        console.error("Erro ao carregar classificações:", error);
      }
    };

    fetchStandings();
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
