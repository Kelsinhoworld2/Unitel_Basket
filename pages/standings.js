'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import StandingsTable from '../components/StandingsTable';
import LeaderCard from '../components/LeaderCard'; // Importa o card dos líderes

export default function Standings() {
  const [teams, setTeams] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL || "https://unitel-basket-api.onrender.com/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca Classificação e Destaques em simultâneo
        const [resTeams, resHighlights] = await Promise.all([
          axios.get(`${API}/standings`),
          axios.get(`${API}/standings/highlights`)
        ]);

        setTeams(resTeams.data || []);
        setHighlights(resHighlights.data || []);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API]);

  // Filtramos os líderes por categoria (Simulação baseada nos dados da API)
  // No futuro, podes criar rotas específicas ou filtrar aqui
  const topScorers = highlights.slice(0, 3); // Top 3 Pontuadores

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* SEÇÃO 1: LEAGUE LEADERS (HIGHLIGHTS) */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="text-accent text-xs uppercase tracking-[0.3em] font-bold">Estatísticas Individuais</span>
            <h2 className="text-3xl font-black text-white italic uppercase mt-2">League <span className="text-accent">Leaders</span></h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl"></div>)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Exemplo de como usar os cards com os dados da API */}
              {topScorers.map((player, index) => (
                <LeaderCard 
                  key={player._id}
                  rank={index + 1}
                  playerName={player.name}
                  avgStats={player.ppg}
                  totalStats={player.totalPoints || (player.ppg * 10).toFixed(0)} 
                  category="points"
                />
              ))}
              
              {/* Se não tiveres dados suficientes na API ainda, podes manter placeholders ou esconder */}
              {topScorers.length === 0 && <p className="text-soft text-sm italic">Dados de jogadores em processamento...</p>}
            </div>
          )}
        </div>

        {/* SEÇÃO 2: TABELA DE CLASSIFICAÇÃO */}
        <div>
          <div className="mb-8">
            <span className="text-accent text-xs uppercase tracking-[0.3em] font-bold">Classificação Geral</span>
            <h2 className="text-3xl font-black text-white italic uppercase mt-2">Tabela do <span className="text-accent">Campeonato</span></h2>
          </div>

          {loading ? (
            <div className="h-64 bg-white/5 rounded-[2rem] animate-pulse"></div>
          ) : (
            <StandingsTable teams={teams} />
          )}
        </div>

      </div>
    </Layout>
  );
}
