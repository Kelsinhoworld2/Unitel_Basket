import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PlayerCard({ player }) {
  if (!player) return null;

  return (
    <Link href={`/players/${player._id}`}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        whileHover={{ scale: 1.02, boxShadow: '0 24px 50px rgba(255,107,0,0.18)' }}
        className="block rounded-3xl border border-white/10 bg-[#111] p-5 transition-all"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black uppercase tracking-tighter text-white">
              {player.name}
            </p>

            <p className="text-sm text-white/70">
              {player.position} • {player.team?.name || 'Equipe'}
            </p>
          </div>

          <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.15em] text-white/80">
            PPG {player.ppg ?? 0}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm text-white/70">
          <div>
            <p className="text-white font-black">{player.apg ?? 0}</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-white/60">AST</p>
          </div>

          <div>
            <p className="text-white font-black">{player.rpg ?? 0}</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-white/60">REB</p>
          </div>

          <div>
            <p className="text-white font-black">{player.gamesPlayed ?? 0}</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-white/60">JGS</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
