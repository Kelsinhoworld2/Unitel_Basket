import Link from 'next/link';

export default function PlayerCard({ player }) {
  return (
    <Link href={`/players/${player._id}`} className="block rounded-3xl border border-border bg-panel p-5 transition hover:-translate-y-0.5 hover:border-accent/30 hover:bg-[#172139]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-white">{player.name}</p>
          <p className="text-sm text-soft">{player.position} • {player.team?.name || 'Equipe'}</p>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.15em]">PPG {player.ppg}</span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm text-soft">
        <div>
          <p className="text-white font-semibold">{player.apg}</p>
          <p>AST</p>
        </div>
        <div>
          <p className="text-white font-semibold">{player.rpg}</p>
          <p>REB</p>
        </div>
        <div>
          <p className="text-white font-semibold">{player.gamesPlayed}</p>
          <p>JGS</p>
        </div>
      </div>
    </Link>
  );
}
