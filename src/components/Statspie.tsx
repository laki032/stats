'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatsPie({ wins = 0, losses = 0 }) {
  const data = {
    labels: ['Pobede', 'Porazi'],
    datasets: [
      {
        label: 'Pobede/Porazi',
        data: [wins, losses],
        backgroundColor: ['#4ade80', '#f87171'],
      },
    ],
  };

  return <Pie data={data} />;
}
