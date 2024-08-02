import React, { useState } from 'react';

const HabitForm = ({ addHabit }) => {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('daily');

  const onSubmit = (e) => {
    e.preventDefault();
    addHabit({ name, frequency, records: [] });
    setName('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Habit name"
        required
      />
      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      >
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default HabitForm;
