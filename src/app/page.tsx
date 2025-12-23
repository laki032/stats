'use client';

import { useEffect, useState, useMemo } from 'react';
import GameRecords from '@/components/GameRecords';
import Leaderboard from '@/components/Leaderboard';

export default function Page() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('/api/players')
      .then(res => res.json())
      .then(setPlayers);
  }, []);

  useEffect(() => {
    fetch('/api/games')
      .then(res => res.json())
      .then(setGames);
  }, []);

  const playersWithStats = useMemo(() => {
    if (players.length === 0 || games.length === 0) return players;

    return players.map(player => {
      const playerAllWins = games.filter(
          g => g.winner.includes(String(player.id))
      );
      const playerSingleWins = playerAllWins.filter(
          g => g.type == "SINGLE"
      );
      const playerAllLoses = games.filter(
          g => g.loser.includes(String(player.id))
      );
      const playerSingleLoses = playerAllLoses.filter(
          g => g.type == "SINGLE"
      );

      return {
        ...player,
        singleWins: playerSingleWins.length,
        singleLoses: playerSingleLoses.length,
        doubleWins: playerAllWins.length - playerSingleWins.length,
        doubleLoses: playerAllLoses.length - playerSingleLoses.length,
        totalWins: playerAllWins.length,
        totalLoses: playerAllLoses.length
      };
    })
    .sort((a, b) => {
      return (b.totalWins ?? 0) - (a.totalWins ?? 0);
    });

  }, [players, games]);

  return (players.length === 0 && games.length === 0) ? (<div></div>) : (
    <div>
      <div className="min-h-screen bg-gray-100 p-6">
        <Leaderboard players={playersWithStats} />
        <br/>
        <GameRecords games={games} players={playersWithStats} />
      </div>
    </div>
  );
}
