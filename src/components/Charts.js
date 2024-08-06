import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Pie, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const mutedColors = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',
];

const LineChart = ({ data }) => {
  return <Line data={data} />;
};

const BarChart = ({ data }) => {
  return <Bar data={data} />;
};

const PieChart = ({ data }) => {
  return <Pie data={data} />;
};

const RadarChart = ({ data }) => {
  return <Radar data={data} />;
};

export { LineChart, BarChart, PieChart, RadarChart, mutedColors };
