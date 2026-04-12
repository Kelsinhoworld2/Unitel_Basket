import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GameCard({ game }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, boxShadow: '0 20px 50px rgba(255,107,0,0.18)' }}
      className="rounded-3xl border border-white/10 bg-[#111] p-5 shadow-lg shadow-black/20"
    >
      <Link href={`/game/${game.id}`} className="block">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] text-[#FF6B00]">Próximo confronto</p>
          <div className="flex items-center justify-between gap-4 text-lg font-black uppercase tracking-tighter text-white">
            <span>{game.teamA}</span>
            <span className="text-[#FF6B00]">vs</span>
            <span>{game.teamB}</span>
          </div>
          <p className="text-sm text-white/70">{game.scoreA} - {game.scoreB}</p>
        </div>
      </Link>
    </motion.div>
  );
}
