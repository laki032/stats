'use client';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {useState} from 'react';

export default function Leaderboard({players}: { players: Player[] }) {
    const [sorting, setSorting] = useState<any>([]);

    const columns: ColumnDef<Player>[] = [
        {
            header: 'Igrač',
            accessorKey: 'name',
            cell: info => info.getValue<string>().toUpperCase(),
        },
        {
            header: 'Singl pobeda',
            accessorKey: 'singleWins',
        },
        {
            header: 'Singl poraza',
            accessorKey: 'singleLoses',
        },
        {
            header: 'Dubl pobeda',
            accessorKey: 'doubleWins',
        },
        {
            header: 'Dubl poraza',
            accessorKey: 'doubleLoses',
        },
        {
            header: 'Ukupno pobeda',
            accessorKey: 'totalWins',
        },
        {
            header: 'Ukupno poraza',
            accessorKey: 'totalLoses',
        },
    ];

    const table = useReactTable({
        data: players,
        columns,
        state: {sorting},
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="max-w-5xl mx-auto">
            <div className="px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Statistika</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer select-none hover:bg-gray-200 transition"
                                    >
                                        <div className="flex items-center gap-1">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: '▲',
                                                desc: '▼',
                                            }[header.column.getIsSorted() as string] ?? (
                                                <span className="text-gray-300">⇅</span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>

                        <tbody>
                        {table.getRowModel().rows.map((row, index) => (
                            <tr
                                key={row.id}
                                className={`
                  border-b last:border-none
                  hover:bg-blue-50 transition
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                `}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td
                                        key={cell.id}
                                        className="px-4 py-3 text-gray-700"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}
