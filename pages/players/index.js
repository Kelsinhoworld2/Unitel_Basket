

import { useState } from "react";

const data = {
  pts: {
    label: "Pontos",
    players: [
      { name: "Jauro Sonça", total: 425, avg: 19.3 },
      { name: "Elcane Paca", total: 343, avg: 15.3 },
      { name: "Childe Dundão", total: 352, avg: 15.2 },
      { name: "Fabio Antonio", total: 350, avg: 15.7 },
      { name: "Fernando Ma", total: 345, avg: 15.7 },
    ],
  },
  ast: {
    label: "Assistências",
    players: [
      { name: "Childe Dundão", total: 137, avg: 6.0 },
      { name: "João Oliveira", total: 117, avg: 4.4 },
      { name: "Gerson Dom.", total: 105, avg: 4.5 },
      { name: "Francisco R", total: 104, avg: 4.4 },
      { name: "Gerson Lukeny", total: 101, avg: 4.3 },
    ],
  },
  blk: {
    label: "Bloqueios",
    players: [
      { name: "Wilson Cassav", total: 28, avg: 1.1 },
      { name: "Augusto Hebo", total: 27, avg: 1.3 },
      { name: "Emanuel Fra", total: 26, avg: 1.7 },
      { name: "Antonio Vihilo", total: 23, avg: 1.0 },
      { name: "Eliseu João", total: 22, avg: 0.9 },
    ],
  },
};

function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function PlayersPage() {
  const [active, setActive] = useState("pts");

  const categories = ["pts", "ast", "blk"];

  const sorted = [...data[active].players].sort(
    (a, b) => b.total - a.total
  );

  return (
    <section className="w-full max-w-xl mx-auto py-8 px-4">

      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <span className="bg-[#1a2d5a] text-white text-xs font-medium px-3 py-1 rounded-md uppercase">
          Unitel Basket 2025/26
        </span>

        <span className="text-gray-400 text-sm">Líder em</span>

        <span className="text-2xl font-medium text-gray-900 dark:text-white">
          {data[active].label}
        </span>
      </div>

      <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">
        Regular Season Leaders
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-lg text-sm font-medium border transition ${
              active === cat
                ? "bg-[#E65C00] text-white border-[#E65C00]"
                : "border-gray-300 text-gray-500 hover:bg-gray-100"
            }`}
          >
            {data[cat].label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col gap-2">
        {sorted.map((player, i) => (
          <div
            key={player.name}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white border ${
              i === 0 ? "border-[#E65C00]" : "border-gray-200"
            }`}
          >
            <span className="w-6 text-center text-gray-400">
              {i + 1}
            </span>

            <div className="w-9 h-9 rounded-full bg-[#1a2d5a] flex items-center justify-center text-white text-xs">
              {initials(player.name)}
            </div>

            <span className="flex-1 font-medium text-gray-900">
              {player.name}
            </span>

            <div className="text-right">
              <div className="text-[#E65C00] font-medium">
                {player.total}
              </div>
              <div className="text-xs text-gray-400">
                méd {player.avg.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
