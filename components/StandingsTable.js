export default function StandingsTable({ teams = [] }) {
  const safeTeams = Array.isArray(teams) ? teams : [];

  return (
    <div className="overflow-x-auto rounded-3xl border border-border bg-panel shadow-xl">
      <table className="w-full text-left border-collapse">
        
        <thead className="bg-white/5 text-sm uppercase text-soft">
          <tr>
            <th className="py-4 px-6">#</th>
            <th className="py-4 px-6">Equipa</th>
            <th className="py-4 px-6 text-center">V</th>
            <th className="py-4 px-6 text-center">D</th>
            <th className="py-4 px-6 text-center font-bold text-accent">PTS</th>
          </tr>
        </thead>

        <tbody>
          {safeTeams.map((team, index) => (
            <tr
              key={team?._id || index}
              className="border-b border-white/5 hover:bg-white/10 transition-colors"
            >
              <td className="py-4 px-6 font-medium text-accent">
                {index + 1}
              </td>

              <td className="py-4 px-6 font-semibold text-white">
                {team?.name || "Equipa"}
              </td>

              <td className="py-4 px-6 text-center text-soft">
                {team?.wins ?? 0}
              </td>

              <td className="py-4 px-6 text-center text-soft">
                {team?.losses ?? 0}
              </td>

              <td className="py-4 px-6 text-center font-bold text-white">
                {team?.points ?? 0}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
