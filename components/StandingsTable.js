export default function StandingsTable({ teams }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-panel shadow-xl shadow-black/20">
      <div className="grid grid-cols-[48px_1fr_120px_120px_120px] gap-4 border-b border-border px-6 py-4 text-sm uppercase text-soft">
        <span>#</span>
        <span>Equipa</span>
        <span>Vitórias</span>
        <span>Derrotas</span>
        <span>Pontos</span>
      </div>
      <div>
        {teams.map((team, index) => (
          <div key={team._id} className="grid grid-cols-[48px_1fr_120px_120px_120px] gap-4 px-6 py-4 hover:bg-white/5">
            <span className="text-accent">{index + 1}</span>
            <span>{team.name}</span>
            <span>{team.wins}</span>
            <span>{team.losses}</span>
            <span>{team.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
