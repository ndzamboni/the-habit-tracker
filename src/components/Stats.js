import React from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';

function Stats() {
  const { habits } = useSelector((state) => state.habits);

  const data = {
    labels: habits.map(habit => habit.name),
    datasets: [
      {
        label: 'Habits',
        data: habits.map(habit => habit.logs.length),
        backgroundColor: habits.map(habit => habit.color),
      },
    ],
  };

  return (
    <div>
      <h1>Stats</h1>
      <Bar data={data} />
    </div>
  );
}

export default Stats;
