import React from 'react';
import { Radar } from 'react-chartjs-2';

function RadarChart({ habits }) {
  const categories = [...new Set(habits.map(habit => habit.category))];
  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Total Duration (minutes)',
        data: categories.map(category => 
          habits.filter(habit => habit.category === category)
                .reduce((total, habit) => total + habit.logs.reduce((sum, log) => sum + log.duration, 0), 0)
        ),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>Time Spent on Habits by Category</h3>
      <Radar data={data} />
    </div>
  );
}

export default RadarChart;
