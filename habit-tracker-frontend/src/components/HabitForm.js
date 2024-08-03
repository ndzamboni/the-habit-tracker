import React, { useState } from 'react';

const HabitForm = ({ addHabit, categories }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [date, setDate] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const selectedCategory = newCategory || category;
    const records = [{ date: new Date(date), status: 'completed' }];
    addHabit({ name, category: selectedCategory, records });
    setName('');
    setCategory('');
    setNewCategory('');
    setDate('');
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
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Or add new category"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default HabitForm;
