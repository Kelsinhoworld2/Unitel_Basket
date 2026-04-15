

import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import StandingsTable from '../components/StandingsTable';
// CORREÇÃO AQUI: Removemos o '.js' e garantimos o caminho para a pasta 'dashboard'
import LeagueLeaders from '../components/dashboard/LeagueLeaders';

export default function Standings() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL || "https://unitel-basket-api.onrender.com/api";
  
    axios.get("https://unitel-basket-api.onrender.com/api/players")


  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(`${API}/standings`);
        if (res.data && Array.isArray(res.data)) {
          setTeams(res.data);
        }
      } catch (error) {
        console.error("Erro ao carregar equipas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, [API]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* 1. SEÇÃO DE LÍDERES */}
        <LeagueLeaders />

        <div className="my-20"></div>

        {/* 2. SEÇÃO DA TABELA DE CLASSIFICAÇÃO */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">
              📊 Classificação Geral
            </h2>
            <p className="max-w-2xl text-sm text-white/70">
              Tabela oficial de pontuação das equipas na Unitel Basket.
            </p>
          </div>

          {loading ? (
            <div className="h-64 bg-white/5 rounded-[2rem] animate-pulse flex items-center justify-center text-soft">
              Sincronizando tabela...
            </div>
          ) : (
            <StandingsTable teams={teams} />
          )}
        </div>

      </div>
    </Layout>
  );
}
