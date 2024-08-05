import React from 'react';
import { useSelector } from 'react-redux';
import { Bar, Pie } from 'react-chartjs-2';

function Stats() {
  const { habits } = useSelector((state) => state.habits);

  const durationData = {
    labels: habits.map(habit => habit.name),
    datasets: [
      {
        label: 'Duration (minutes)',
        data: habits.flatMap(habit => habit.logs.map(log => log.duration)),
        backgroundColor: habits.map(habit => habit.color),
      },
    ],
  };

  const categoryData = {
    labels: [...new Set(habits.map(habit => habit.category))],
    datasets: [
      {
        label: 'Categories',
        data: habits.reduce((acc, habit) => {
          acc[habit.category] = (acc[habit.category] || 0) + 1;
          return acc;
        }, {}),
        backgroundColor: habits.map(habit => habit.color),
      },
    ],
  };

  return (
    <div>
      <h1>Stats</h1>
      <Bar data={durationData} />
      <Pie data={categoryData} />
    </div>
  );
}

export default Stats;
