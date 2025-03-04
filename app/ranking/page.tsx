"use client";
import { useState } from "react";

const players = Array.from({ length: 100 }, (_, i) => ({
  rank: i + 1,
  name: `Player ${i + 1}`,
  games: Math.floor(Math.random() * 50) + 10,
  win: Math.floor(Math.random() * 30),
  draw: Math.floor(Math.random() * 10),
  loss: Math.floor(Math.random() * 10),
  pts: Math.floor(Math.random() * 100),
  pct: Math.floor(Math.random() * 100),
  avg: (Math.random() * 2).toFixed(2),
  vote: (Math.random() * 10).toFixed(2),
  avatar: `/avatars/player${i + 1}.jpg`,
}));

const PAGE_SIZE = 10;

export default function Leaderboard() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(players.length / PAGE_SIZE);

  const paginatedPlayers = players.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Pagination Controls */}
      <div className="flex space-x-2 mb-4">
        <button 
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50" 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)}
        >
          « previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i} 
            className={`px-3 py-1 ${page === i + 1 ? "bg-red-500 text-white" : "bg-gray-200"}`} 
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button 
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50" 
          disabled={page === totalPages} 
          onClick={() => setPage(page + 1)}
        >
          next »
        </button>
      </div>

      {/* Leaderboard Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th>Rank</th><th>Player</th><th>Game</th><th>Win</th><th>Draw</th><th>Loss</th>
            <th>Pts</th><th>Pct(%)</th><th>Avg</th><th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPlayers.map((player) => (
            <tr key={player.rank} className="border-b">
              <td className="text-center font-bold">{player.rank}</td>
              <td className="flex items-center space-x-2">
                <img src={player.avatar} alt={player.name} width={40} height={40} className="rounded-full" />
                <span>{player.name}</span>
              </td>
              <td className="text-center">{player.games}</td>
              <td className="text-center">{player.win}</td>
              <td className="text-center">{player.draw}</td>
              <td className="text-center">{player.loss}</td>
              <td className="text-center font-bold text-orange-600">{player.pts}</td>
              <td className="text-center text-purple-600">{player.pct}</td>
              <td className="text-center text-green-600">{player.avg}</td>
              <td className="text-center text-yellow-600">{player.vote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
