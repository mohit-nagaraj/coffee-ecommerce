"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  labels: string[];
  data: number[];
  title: string;
  backgroundColor: string[];
  borderColor: string[];
}

const TopProductsChart: React.FC<ChartProps> = ({
  labels,
  data,
  title,
  backgroundColor,
  borderColor,
}) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Sales",
        data: data,
        backgroundColor: backgroundColor,   
        borderColor: borderColor,
        borderWidth: 1,
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

  return <Doughnut data={chartData} options={options} className="min-h-60" />;
};

export default TopProductsChart;
