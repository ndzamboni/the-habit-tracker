import React from 'react';

const HabitList = ({ habits, updateHabit, deleteHabit }) => {
  return (
    <ul>
      {habits.map((habit) => (
        <li key={habit._id}>
          <h3>{habit.name}</h3>
          <button onClick={() => updateHabit(habit._id, { ...habit, completed: !habit.completed })}>
            {habit.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => deleteHabit(habit._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default HabitList;
