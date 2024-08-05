import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHabits } from '../features/habit/habitSlice';

function AddHabit() {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [color, setColor] = useState('#000000');
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/habits', { name, frequency, color }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchHabits(user._id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Habit Name"
        required
      />
      <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        required
      />
      <button type="submit">Add Habit</button>
    </form>
  );
}

export default AddHabit;
