import React from 'react';
import { Line } from 'react-chartjs-2';

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
