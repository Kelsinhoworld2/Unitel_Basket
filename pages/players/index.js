'use client';

// 1. Verificação de caminho: 
// Se LeagueLeaders está em components/Dashboard/LeagueLeaders.js, o caminho é este:
import Layout from '../../components/Layout';
import LeagueLeaders from '../../components/Dashboard/LeagueLeaders';
import { motion } from 'framer-motion';

export default function PlayersPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Cabeçalho que já aparece na tua imagem */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12 border-l-4 border-accent pl-6"
        >
          <span className="text-accent text-xs uppercase tracking-[0.3em] font-bold">JOGADORES</span>
          <h1 className="text-4xl font-black text-white italic uppercase mt-2">
            Perfil dos <span className="text-accent">atletas</span>
          </h1>
          <p className="text-soft text-sm mt-2 max-w-xl">
            Veja o ranking de pontuação, assistências e ressaltos dos principais jogadores do Unitel Basket.
          </p>
        </motion.div>

        {/* 2. O COMPONENTE QUE ESTÁ A FALTAR APARECER */}
        <div className="mt-10">
           <LeagueLeaders />
        </div>

        {/* Rodapé informativo */}
        <div className="mt-20 p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
          <p className="text-soft text-[10px] uppercase tracking-[0.2em]">
            Dados oficiais da temporada Unitel Basket 2025/2026
          </p>
        </div>
      </div>
    </Layout>
  );
}
