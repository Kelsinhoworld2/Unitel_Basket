import { motion } from 'framer-motion';

export default function LeaderCard({
  rank = 0,
  playerName = 'Jogador',
  totalStats = 0,
  avgStats = 0,
  category = 'points'
}) {
  const categoryConfig = {
    points: {
      color: 'from-orange-600 to-red-600',
      bgGlow: 'hover:shadow-orange-500/30',
      icon: '🏀',
      label: 'PPG'
    },
    assists: {
      color: 'from-blue-600 to-cyan-600',
      bgGlow: 'hover:shadow-blue-500/30',
      icon: '🎯',
      label: 'APG'
    },
    blocks: {
      color: 'from-purple-600 to-violet-600',
      bgGlow: 'hover:shadow-purple-500/30',
      icon: '🛡️',
      label: 'BPG'
    }
  };

  const config = categoryConfig[category] || categoryConfig.points;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      className={`rounded-2xl border border-white/10 bg-[#111a2e] p-5 shadow-lg shadow-black/40 transition-all ${config.bgGlow} hover:shadow-2xl`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Rank Badge */}
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${config.color} font-black text-white shadow-lg`}
          >
            {rank}
          </div>

          {/* Player Info */}
          <div>
            <p className="text-sm font-black uppercase tracking-tight text-white">
              {playerName}
            </p>

            <p className="text-xs uppercase tracking-widest text-white/60">
              {config.label} {avgStats}
            </p>
          </div>
        </div>

        {/* Stats Value */}
        <div className="text-right">
          <p
            className={`text-2xl font-black bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}
          >
            {totalStats}
          </p>

          <p className="text-xs uppercase tracking-widest text-white/60">
            {category}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
