import { motion } from 'framer-motion';

export default function LiveMatchCard({ game }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, boxShadow: '0 30px 60px rgba(255,107,0,0.18)' }}
      className="rounded-3xl border border-white/10 bg-[#111] p-6 shadow-2xl shadow-black/30"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[#FF6B00]">Jogo do dia</p>
          <h3 className="mt-3 text-3xl font-black uppercase tracking-tighter text-white">{game.homeTeam.name} vs {game.awayTeam.name}</h3>
          <p className="mt-2 text-sm text-white/70">{new Date(game.date).toLocaleString('pt-BR', { dateStyle: 'medium', timeStyle: 'short' })}</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.15em] text-white/80">{game.status.toUpperCase()}</span>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_1fr] text-center text-white">
        <div className="rounded-3xl bg-[#161d2e] p-5">
          <p className="text-xs uppercase text-white/60">Casa</p>
          <p className="mt-3 text-5xl font-black text-white">{game.homeScore}</p>
          <p className="mt-2 text-sm text-white/70">{game.homeTeam.name}</p>
        </div>
        <div className="rounded-full bg-[#1f2b48] px-6 py-5 text-4xl font-black text-[#FF6B00]">X</div>
        <div className="rounded-3xl bg-[#161d2e] p-5">
          <p className="text-xs uppercase text-white/60">Fora</p>
          <p className="mt-3 text-5xl font-black text-white">{game.awayScore}</p>
          <p className="mt-2 text-sm text-white/70">{game.awayTeam.name}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
        <span className="rounded-2xl bg-white/5 px-4 py-2">{game.venue}</span>
        <span className="rounded-2xl bg-white/5 px-4 py-2">{game.highlight}</span>
      </div>
    </motion.div>
  );
}
