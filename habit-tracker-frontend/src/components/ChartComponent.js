import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const groupRecordsByDate = (habits) => {
  const dateMap = {};

  habits.forEach((habit) => {
    habit.records.forEach((record) => {
      const date = new Date(record.date).toLocaleDateString();
      if (!dateMap[date]) {
        dateMap[date] = 0;
      }
      dateMap[date] += 1;
    });
  });

  const dates = Object.keys(dateMap).sort((a, b) => new Date(a) - new Date(b));
  const counts = dates.map((date) => dateMap[date]);

  return { dates, counts };
};

const ChartComponent = ({ habits, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const filteredHabits = habits.filter(
    (habit) => !selectedCategory || habit.category === selectedCategory
  );

  const { dates, counts } = groupRecordsByDate(filteredHabits);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Habit Activity',
        data: counts,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div>
      <div>
        <label>Category: </label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <Line data={data} />
    </div>
  );
};

export default ChartComponent;
