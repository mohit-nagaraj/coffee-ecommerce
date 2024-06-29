"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DailySalesChart: React.FC = () => {
  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: 'Daily Income',
        data: [500, 700, 200, 1000, 400, 800, 300],
        fill: false,
        backgroundColor: 'rgb(212, 163, 115)',
        borderColor: 'rgba(212, 163, 115, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Income Generated',
      },
    },
  };

  return <Line data={data} options={options} className='min-h-60'/>;
};

export default DailySalesChart;
