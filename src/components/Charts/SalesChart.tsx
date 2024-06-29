"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  labels: string[];
  data: number[];
  title: string;
  color?: string;
}

const SalesChart: React.FC<ChartProps> = ({
  labels,
  data,
  title,
  color,
}) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Income",
        data: data,
        fill: false,
        backgroundColor: `rgb(${color ? color : "212, 163, 115"})`,
        borderColor: `rgba(${color ? color : "212, 163, 115"}, 0.5)`,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Line data={chartData} options={options} className="min-h-60" />;
};

export default SalesChart;
