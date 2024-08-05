import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHabits } from '../features/habit/habitSlice';

function AddHabit() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const { user } = useSelector((state) => state.user);
  const { habits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedCategory = category === 'new' ? newCategory : category;
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/habits', { name, category: selectedCategory, date, duration }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchHabits(user._id));
      setName('');
      setCategory('');
      setNewCategory('');
      setDate('');
      setDuration('');
    } catch (error) {
      console.error(error);
    }
  };

  const uniqueCategories = [...new Set(habits.map(habit => habit.category))];

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Habit Name"
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        {uniqueCategories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
        <option value="new">Add New Category</option>
      </select>
      {category === 'new' && (
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category"
          required
        />
      )}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration (minutes)"
        required
      />
      <button type="submit">Add Habit</button>
    </form>
  );
}

export default AddHabit;
