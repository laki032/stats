'use client';

import React from 'react';

function formatDate(date: string) {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
}

function selectPlayer(player: string) {
    console.log("select " + player);
}

function formatPlayers(playersIds: string[], allPlayers: Player[]): React.ReactNode {
    return playersIds.sort().map((id, index) => {
        const p = allPlayers.find(pl => pl.id === id);
        if (!p) return null;

        return (
            <React.Fragment key={id}>
                {index > 0 && <span className="text-gray-500"> / </span>}
                <a
                    onClick={() => selectPlayer(p.id)}
                    className="text-blue-600 font-medium hover:underline cursor-pointer"
                >
                    {p.name.toUpperCase()}
                </a>
            </React.Fragment>
        );
    });
}

export default function GameRecords({ games, players }: { games: Game[], players: Player[] }) {
    return (
        <div className="max-w-5xl mx-auto mt-8">
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Evidencija igara</h2>
                    <p className="text-sm text-gray-500">Sve odigrane igre</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Vreme</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Pobednik</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Porazeni</th>
                        </tr>
                        </thead>
                        <tbody>
                        {games.map((game, index) => (
                            <tr
                                key={game.id}
                                className={`border-b last:border-none transition hover:bg-blue-50 ${
                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}
                            >
                                <td className="px-4 py-3 text-gray-700">{formatDate(game.created_at)}</td>
                                <td className="px-4 py-3 text-gray-700">{formatPlayers(game.winner, players)}</td>
                                <td className="px-4 py-3 text-gray-700">{formatPlayers(game.loser, players)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
