import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabits } from '../features/habit/habitSlice';
import HabitCategoryChart from './HabitCategoryChart';
import AddHabit from './AddHabit';
import axios from 'axios';

function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { habits } = useSelector((state) => state.habits);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (user) {
      dispatch(fetchHabits(user._id));
    }
  }, [dispatch, user]);

  const handleDeleteCategory = async (category) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/habits/category/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchHabits(user._id));
    } catch (error) {
      console.error(error);
    }
  };

  const uniqueCategories = [...new Set(habits.map(habit => habit.category))];

  return (
    <div>
      <h1>Dashboard</h1>
      <AddHabit />
      <div>
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {uniqueCategories.map(category => (
        (selectedCategory === '' || selectedCategory === category) && (
          <div key={category}>
            <h3>{category}</h3>
            <button onClick={() => handleDeleteCategory(category)}>Delete Category</button>
            <HabitCategoryChart category={category} habits={habits.filter(habit => habit.category === category)} />
          </div>
        )
      ))}
    </div>
  );
}

export default Dashboard;
