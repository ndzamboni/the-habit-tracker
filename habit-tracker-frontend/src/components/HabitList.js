import React, { useState } from 'react';

const HabitList = ({ habits, updateHabit, deleteHabit, categories }) => {
  const [filterCategory, setFilterCategory] = useState('');

  const filteredHabits = habits.filter(
    (habit) => !filterCategory || habit.category === filterCategory
  );

  return (
    <div>
      <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>
      <ul>
        {filteredHabits.map((habit) => (
          <li key={habit._id}>
            <h3>{habit.name}</h3>
            <p>Category: {habit.category}</p>
            <p>Records:</p>
            <ul>
              {habit.records.map((record, index) => (
                <li key={index}>{new Date(record.date).toLocaleDateString()}: {record.status}</li>
              ))}
            </ul>
            <button onClick={() => updateHabit(habit._id, { ...habit, completed: !habit.completed })}>
              {habit.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteHabit(habit._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitList;
