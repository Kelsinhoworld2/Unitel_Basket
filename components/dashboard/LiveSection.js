import LiveMatchCard from "../LiveMatchCard";

export default function LiveGamesSection({ games }) {
  // Se não houver jogos ao vivo, podemos mostrar uma mensagem ou nada
  if (!games || games.length === 0) {
    return (
      <section className="mt-8 p-6 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200">
        <p className="text-center text-slate-500 font-medium">
          Nenhum jogo a decorrer neste momento. 🏀
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      {/* Título da Secção com o badge de pulsação */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">
            Jogos Ao Vivo
          </h2>
        </div>
        
        <div className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          DIRETO
        </div>
      </div>

      {/* Grelha de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <LiveMatchCard key={game._id} game={game} />
        ))}
      </div>
    </section>
  );
}
