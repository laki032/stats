'use client';

import {useEffect, useState} from 'react';

type MatchType = 'SINGLE' | 'DOUBLE';

function MatchTypeToggle({
                             value,
                             onChange,
                         }: {
    value: 'SINGLE' | 'DOUBLE';
    onChange: (v: 'SINGLE' | 'DOUBLE') => void;
}) {
    return (
        <div className="flex bg-gray-200 rounded-xl p-1">
            {(['SINGLE', 'DOUBLE'] as const).map(v => (
                <button
                    key={v}
                    onClick={() => onChange(v)}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition
            ${value === v
                        ? 'bg-white shadow text-blue-600'
                        : 'text-gray-600'}
          `}
                >
                    {v === 'SINGLE' ? 'Singl' : 'Dubl'}
                </button>
            ))}
        </div>
    );
}

function PlayerPicker({
                          players,
                          selected,
                          onChange,
                          max,
                      }: {
    players: Player[];
    selected: string[];
    onChange: (ids: string[]) => void;
    max: number;
}) {
    const toggle = (id: string) => {
        if (selected.includes(id)) {
            onChange(selected.filter(x => x !== id));
        } else if (selected.length < max) {
            onChange([...selected, id]);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-2">
            {players.map(p => {
                const active = selected.includes(p.id);
                return (
                    <button
                        key={p.id}
                        type="button"
                        onClick={() => toggle(p.id)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium border transition
              ${active
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300'}
            `}
                    >
                        {p.name.toUpperCase()}
                    </button>
                );
            })}
        </div>
    );
}

export default function Admin() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [type, setType] = useState<MatchType>('SINGLE');

    const [winner, setWinner] = useState<string>('');
    const [loser, setLoser] = useState<string>('');

    const [winnerTeam, setWinnerTeam] = useState<string[]>([]);
    const [loserTeam, setLoserTeam] = useState<string[]>([]);

    function clear() {
        setWinner('');
        setLoser('');
        setWinnerTeam([]);
        setLoserTeam([]);
    }

    useEffect(() => {
        fetch('/api/players')
            .then(res => res.json())
            .then(setPlayers);
    }, []);

    useEffect(() => {
        clear();
    }, [type]);

    const submit = async () => {
        const body =
            type === 'SINGLE'
                ? {
                    type,
                    winner: [winner],
                    loser: [loser],
                }
                : {
                    type,
                    winner: winnerTeam,
                    loser: loserTeam,
                };

        await fetch('/api/games', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });

        alert('Meč unet ✅');
        clear();
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Unos
                    </h2>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tip meča
                        </label>
                        <MatchTypeToggle value={type} onChange={setType}/>
                    </div>

                    {type === 'SINGLE' && (
                        <>
                            <PlayerPicker
                                players={players}
                                selected={winner ? [winner] : []}
                                onChange={ids => setWinner(ids[0] ?? '')}
                                max={1}
                            />
                            <div className="flex items-center my-4">
                                <div className="flex-grow h-px bg-gray-300"/>
                                <span
                                    className="mx-3 px-3 py-1 text-xs font-bold text-gray-600 bg-gray-100 rounded-full">
    VS
  </span>
                                <div className="flex-grow h-px bg-gray-300"/>
                            </div>

                            <PlayerPicker
                                players={players.filter(p => p.id !== winner)}
                                selected={loser ? [loser] : []}
                                onChange={ids => setLoser(ids[0] ?? '')}
                                max={1}
                            />
                        </>
                    )}

                    {type === 'DOUBLE' && (
                        <>
                            <PlayerPicker
                                players={players}
                                selected={winnerTeam}
                                onChange={setWinnerTeam}
                                max={2}
                            />
                            <div className="flex items-center my-4">
                                <div className="flex-grow h-px bg-gray-300"/>
                                <span
                                    className="mx-3 px-3 py-1 text-xs font-bold text-gray-600 bg-gray-100 rounded-full">
    VS
  </span>
                                <div className="flex-grow h-px bg-gray-300"/>
                            </div>

                            <PlayerPicker
                                players={players.filter(p => !winnerTeam.includes(p.id))}
                                selected={loserTeam}
                                onChange={setLoserTeam}
                                max={2}
                            />
                        </>
                    )}

                    <button
                        onClick={submit}
                        disabled={
                            type === 'SINGLE'
                                ? !winner || !loser
                                : winnerTeam.length !== 2 || loserTeam.length !== 2
                        }
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                    >
                        Sačuvaj rezultat
                    </button>
                </div>
            </div>
        </div>
    );
}
