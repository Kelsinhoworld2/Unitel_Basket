<tbody>
  {(Array.isArray(teams) ? teams : []).map((team, index) => (
    <tr
      key={team?._id || index}
      className="border-b border-white/5 hover:bg-white/5 transition"
    >
      <td className="py-4 px-2 font-medium text-accent">
        {index + 1}
      </td>

      <td className="py-4 font-semibold">
        {team?.name || "-"}
      </td>

      <td className="py-4 text-center">
        {team?.wins ?? 0}
      </td>

      <td className="py-4 text-center">
        {team?.losses ?? 0}
      </td>

      <td className="py-4 text-center font-bold text-white">
        {team?.points ?? 0}
      </td>
    </tr>
  ))}
</tbody>
