import Link from 'next/link';

export default function GameCard ({ game }) {
  return (
    <div style={{
      background: "#1e293b",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "10px"
    }}>
      <Link href={`/game/${game.id}`}>
        <p>
          {game.teamA} vs {game.teamB}
        </p>
        <p>
          {game.scoreA} - {game.scoreB}
        </p>
      </Link>
    </div>
  );
}
