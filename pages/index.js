import Layout from '../../components/Layout';
import LeagueLeaders from '../../components/dashboard/LeagueLeaders';

export default function PlayersPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <LeagueLeaders />
      </div>
    </Layout>
  );
}
