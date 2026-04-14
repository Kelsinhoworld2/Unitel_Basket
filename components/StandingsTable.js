

export default function StandingsTable({ teams = [] }) {
  // Garante que 'teams' é sempre uma lista para não crashar o .map
  const safeTeams = Array.isArray(teams) ? teams : [];

  return (
    <div className="overflow-x-auto rounded-[2rem] border border-white/5 bg-[#111a2e] shadow-2xl">
      <table className="w-full text-left border-collapse">
        
        <thead className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-soft">
          <tr>
            <th className="py-5 px-8">#</th>
            <th className="py-5 px-8">Equipa</th>
            <th className="py-5 px-8 text-center">V</th>
            <th className="py-5 px-8 text-center">D</th>
            <th className="py-5 px-8 text-center font-black text-accent">PTS</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/5">
          {safeTeams.map((team, index) => (
            <tr 
              key={team._id || index} 
              className="hover:bg-white/[0.02] transition-colors group"
            >
              <td className="py-5 px-8 text-accent font-black text-sm">
                {String(index + 1).padStart(2, '0')}
              </td>
              
              <td className="py-5 px-8">
                <p className="text-white font-bold uppercase tracking-tight text-sm group-hover:text-accent transition-colors">
                  {team.name || "Equipa Desconhecida"}
                </p>
                <span className="text-[10px] text-soft uppercase tracking-widest">
                  {team.city || "Angola"}
                </span>
              </td>

              <td className="py-5 px-8 text-center text-soft font-medium">
                {team.wins ?? 0}
              </td>

              <td className="py-5 px-8 text-center text-soft font-medium">
                {team.losses ?? 0}
              </td>

              <td className="py-5 px-8 text-center font-black text-white text-lg">
                {team.points ?? 0}
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {safeTeams.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-soft uppercase tracking-widest text-xs font-medium">
            Nenhum dado de classificação disponível
          </p>
        </div>
      )}
    </div>
  );
}
