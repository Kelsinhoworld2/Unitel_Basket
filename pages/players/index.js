'use client';

import Layout from '../../components/Layout';
import LeagueLeaders from '../../components/dashboard/LeagueLeaders';
import { motion } from 'framer-motion';

export default function PlayersPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* TESTE VISUAL */}
        <p className="text-yellow-400 font-bold bg-black p-2 text-center">
          VERSÃO NOVA: 19:30h
        </p>

        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12 border-l-4 border-accent pl-6"
        >
          <span className="text-accent text-xs uppercase tracking-[0.3em] font-bold">
            JOGADORES
          </span>

          <h1 className="text-4xl font-black text-white italic uppercase mt-2">
            Perfil dos <span className="text-accent">atletas</span>
          </h1>

          <p className="text-soft text-sm mt-2 max-w-xl">
            Veja os líderes da liga em pontos, assistências e blocks.
          </p>
        </motion.div>

        {/* 🔥 COMPONENTE PRINCIPAL */}
        <LeagueLeaders />

      </div>
    </Layout>
  );
}
