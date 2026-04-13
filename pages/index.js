'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://unitel-basket-api.onrender.com/api";

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API}/games`);
        setGames(res.data || []);
      } catch (err) {
        console.error("Erro ao carregar jogos:", err);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [API]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Cabeçalho do Dashboard */}
        <div className="mb-12">
          <span className="text-accent text-xs uppercase tracking-[0.3em] font-bold">Live Scores</span>
          <h1 className="text-4xl font-black text-white mt-2 italic uppercase">
            Unitel <span className="text-accent">Basket</span>
          </h1>
          <div className="h-1 w-20 bg-accent mt-4"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent"></div>
          </div>
        ) : games.length > 0 ? (
          /* GRID DE JOGOS - Responsivo */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game) => (
              <div 
                key={game._id} 
                className="bg-[#111a2e] border border-white/5 rounded-[2rem] p-8 shadow-2xl hover:border-accent/40 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Efeito de brilho no hover */}
                <div className="absolute -right-10 -top-10 h-32 w-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-all"></div>

                <div className="flex justify-between items-center mb-8">
                  <span className="flex items-center gap-2 bg-red-600/10 text-red-500 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                    <span className="h-1.5 w-1.5 bg-red-600 rounded-full animate-ping"></span>
                    Ao Vivo
                  </span>
                  <span className="text-soft text-[10px] font-mono uppercase tracking-widest">
                    {game.status || 'Em andamento'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center gap-4 relative z-10">
                  {/* Equipa Casa */}
                  <div className="flex-1 text-center">
                    <p className="text-white font-black uppercase text-xs mb-4 min-h-[32px] flex items-center justify-center leading-tight">
                      {game.homeTeam?.name || game.homeTeam || "Equipa A"}
                    </p>
                    <span className="text-5xl font-black text-white tracking-tighter">
                      {game.homeScore ?? 0}
                    </span>
                  </div>

                  <div className="text-accent/30 font-black text-xl italic px-2">VS</div>

                  {/* Equipa Fora */}
                  <div className="flex-1 text-center">
                    <p className="text-white font-black uppercase text-xs mb-4 min-h-[32px] flex items-center justify-center leading-tight">
                      {game.awayTeam?.name || game.awayTeam || "Equipa B"}
                    </p>
                    <span className="text-5xl font-black text-white tracking-tighter">
                      {game.awayScore ?? 0}
                    </span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
                  <button className="text-[10px] font-black text-soft group-hover:text-accent transition-colors uppercase tracking-[0.2em]">
                    Ver Estatísticas →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-panel rounded-[2rem] border border-dashed border-white/10">
            <p className="text-soft font-medium uppercase tracking-widest text-sm">Nenhum jogo disponível no momento</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
