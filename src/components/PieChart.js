import React from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart({ habits }) {
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
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return (
    <div>
      <h3>Time Spent on Habits by Category</h3>
      <Pie data={data} />
    </div>
  );
}

export default PieChart;
