import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Habit({ habit }) {
  const data = {
    labels: habit.logs.map(log => new Date(log.date).toLocaleDateString()),
    datasets: [
      {
        label: habit.name,
        data: habit.logs.map(log => log.completed ? 1 : 0),
        borderColor: habit.color,
        backgroundColor: habit.color,
      },
    ],
  };

  return (
    <div>
      <h2>{habit.name}</h2>
      <Line data={data} />
    </div>
  );
}

export default Habit;
