"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  labels: string[];
  data: number[];
  title: string;
}

const AverageSpendChart: React.FC<ChartProps> = ({ labels, data, title }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Average Spend',
        data: data,
        backgroundColor: 'rgb(244, 162, 97, 0.2)',
        borderColor: 'rgb(244, 162, 97, 1)',
        borderWidth: 1,
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
        display: false,
        text: title,
      },
    },
  };

  return <Bar data={chartData} options={options} className="min-h-60" />;
};

export default AverageSpendChart;
