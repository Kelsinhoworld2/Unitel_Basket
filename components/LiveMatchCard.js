export default function LiveMatchCard({ game }) {
  return (
    <div className="rounded-3xl border border-border bg-panel p-5 shadow-xl shadow-black/20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-accent">Jogo do dia</p>
          <h3 className="mt-2 text-2xl font-semibold">{game.homeTeam.name} vs {game.awayTeam.name}</h3>
          <p className="text-sm text-soft">{new Date(game.date).toLocaleString('pt-BR', { dateStyle: 'medium', timeStyle: 'short' })}</p>
        </div>
        <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-white/80">{game.status.toUpperCase()}</span>
      </div>
      <div className="mt-6 flex items-center justify-between gap-6 text-center text-white">
        <div className="flex-1 rounded-3xl bg-[#161d2e] p-4">
          <p className="text-xs uppercase text-soft">Casa</p>
          <p className="mt-2 text-4xl font-semibold">{game.homeScore}</p>
          <p className="mt-2 text-sm text-soft">{game.homeTeam.name}</p>
        </div>
        <div className="rounded-full bg-[#1f2b48] px-6 py-4 text-3xl font-bold text-accent">X</div>
        <div className="flex-1 rounded-3xl bg-[#161d2e] p-4">
          <p className="text-xs uppercase text-soft">Fora</p>
          <p className="mt-2 text-4xl font-semibold">{game.awayScore}</p>
          <p className="mt-2 text-sm text-soft">{game.awayTeam.name}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3 text-sm text-soft">
        <span className="rounded-2xl bg-white/5 px-4 py-2">{game.venue}</span>
        <span className="rounded-2xl bg-white/5 px-4 py-2">{game.highlight}</span>
      </div>
    </div>
  );
}
