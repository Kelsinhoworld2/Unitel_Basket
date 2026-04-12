import { motion } from 'framer-motion';
import LeaderCard from './LeaderCard';

const leagueLeadersData = {
  points: [
    { rank: 1, playerName: 'Jauro Sonça', totalStats: '425 pts', avgStats: '18.2' },
    { rank: 2, playerName: 'Elcane Paca', totalStats: '365 pts', avgStats: '15.2' },
    { rank: 3, playerName: 'Childe Dundão', totalStats: '352 pts', avgStats: '16.2' },
    { rank: 4, playerName: 'Fabio Antonio', totalStats: '350 pts', avgStats: '15.2' },
    { rank: 5, playerName: 'Fernando Ma', totalStats: '345 pts', avgStats: '15.7' }
  ],
  assists: [
    { rank: 1, playerName: 'Childe Dundão', totalStats: '137 ast', avgStats: '6.0' },
    { rank: 2, playerName: 'João Oliveira', totalStats: '117 ast', avgStats: '5.4' },
    { rank: 3, playerName: 'Gerson Domingos', totalStats: '105 ast', avgStats: '4.8' },
    { rank: 4, playerName: 'Francisco R.', totalStats: '104 ast', avgStats: '4.7' },
    { rank: 5, playerName: 'Gerson Lukeny', totalStats: '101 ast', avgStats: '4.4' }
  ],
  blocks: [
    { rank: 1, playerName: 'Wilson Cassay', totalStats: '28 blk', avgStats: '1.3' },
    { rank: 2, playerName: 'Augusto Hebo', totalStats: '27 blk', avgStats: '1.3' },
    { rank: 3, playerName: 'Emanuel Fra', totalStats: '26 blk', avgStats: '1.2' },
    { rank: 4, playerName: 'Antonio Vihilo', totalStats: '23 blk', avgStats: '1.1' },
    { rank: 5, playerName: 'Eliseu João', totalStats: '22 blk', avgStats: '1.1' }
  ]
};

const CategorySection = ({ title, icon, category, leaders }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b1220] to-[#111a2e] p-6 shadow-xl shadow-black/30"
  >
    <h3 className="mb-6 text-2xl font-black uppercase italic tracking-tighter text-white">
      {icon} {title}
    </h3>
    <div className="space-y-4">
      {leaders.map((leader, index) => (
        <LeaderCard
          key={index}
          rank={leader.rank}
          playerName={leader.playerName}
          totalStats={leader.totalStats}
          avgStats={leader.avgStats}
          category={category}
        />
      ))}
    </div>
  </motion.div>
);

export default function LeagueLeaders() {
  return (
    <section className="mt-12 space-y-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="space-y-3"
      >
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">
          🏆 LÍDERES DA LIGA
        </h2>
        <p className="max-w-2xl text-sm text-white/70">
          Os melhores desempenhos da temporada Unitel Basket 2025/2026 divididos por categoria estatística.
        </p>
      </motion.div>

      {/* Leaders Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <CategorySection
          title="Points Leaders"
          icon="🏀"
          category="points"
          leaders={leagueLeadersData.points}
        />
        <CategorySection
          title="Assists Leaders"
          icon="🎯"
          category="assists"
          leaders={leagueLeadersData.assists}
        />
        <CategorySection
          title="Blocks Leaders"
          icon="🛡️"
          category="blocks"
          leaders={leagueLeadersData.blocks}
        />
      </div>
    </section>
  );
}
