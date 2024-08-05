import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

function HabitCategoryChart({ category, habits }) {
  const logsByDate = {};

  habits.forEach(habit => {
    habit.logs.forEach(log => {
      const date = new Date(log.date).toISOString().split('T')[0];
      if (!logsByDate[date]) {
        logsByDate[date] = 0;
      }
      logsByDate[date]++;
    });
  });

  const dates = Object.keys(logsByDate).sort();
  const frequencies = dates.map(date => logsByDate[date]);

  const data = {
    labels: dates,
    datasets: [{
      label: `${category} Habits`,
      data: frequencies,
      borderColor: habits[0].color,
      backgroundColor: habits[0].color,
    }],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Frequency',
        },
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: `Habit Frequency for ${category}`,
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}

export default HabitCategoryChart;
