import React from 'react';
import { Bar } from 'react-chartjs-2';

function BarChart({ habits }) {
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
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h3>Time Spent on Habits by Category</h3>
      <Bar data={data} />
    </div>
  );
}

export default BarChart;
