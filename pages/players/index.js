'use client';

// Ajustamos os caminhos com ../../ para sair da pasta players e da pasta pages
import Layout from '../../components/Layout';
import LeagueLeaders from '../../components/LeagueLeaders';
import { motion } from 'framer-motion';

export default function PlayersPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Cabeçalho da Página */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12 border-l-4 border-accent pl-6"
        >
          <span className="text-accent text-xs uppercase tracking-[0.3em] font-bold">Estatísticas Individuais</span>
          <h1 className="text-4xl font-black text-white italic uppercase mt-2">
            Elite <span className="text-accent">da Liga</span>
          </h1>
          <p className="text-soft text-sm mt-2 max-w-xl">
            Confira os jogadores que estão a dominar as tabelas em Angola nesta temporada.
          </p>
        </motion.div>

        {/* Componente com Jauro Sonça, Childe Dundão e os outros líderes */}
        <LeagueLeaders />

        {/* Rodapé informativo */}
        <div className="mt-20 p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
          <p className="text-soft text-xs uppercase tracking-widest">
            Os dados são atualizados após o término de cada jornada oficial.
          </p>
        </div>
      </div>
    </Layout>
  );
}
