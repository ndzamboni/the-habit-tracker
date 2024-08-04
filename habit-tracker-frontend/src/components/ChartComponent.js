import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const groupRecordsByDate = (habits) => {
  const dateMap = {};

  habits.forEach((habit) => {
    habit.records.forEach((record) => {
      const date = new Date(record.date).toLocaleDateString();
      if (!dateMap[date]) {
        dateMap[date] = {};
      }
      if (!dateMap[date][habit.category]) {
        dateMap[date][habit.category] = 0;
      }
      dateMap[date][habit.category] += 1;
    });
  });

  const dates = Object.keys(dateMap).sort((a, b) => new Date(a) - new Date(b));
  const categories = Object.keys(habits.reduce((acc, habit) => ({ ...acc, [habit.category]: true }), {}));
  
  const datasets = categories.map((category, index) => ({
    label: category,
    data: dates.map((date) => dateMap[date][category] || 0),
    fill: false,
    backgroundColor: getRandomColor(),
    borderColor: getRandomColor(),
  }));

  return { dates, datasets };
};

const ChartComponent = ({ habits, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const filteredHabits = habits.filter(
    (habit) => !selectedCategory || habit.category === selectedCategory
  );

  const { dates, datasets } = groupRecordsByDate(filteredHabits);

  const data = {
    labels: dates,
    datasets,
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
