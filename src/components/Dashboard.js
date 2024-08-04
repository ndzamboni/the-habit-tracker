import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabits } from '../features/habit/habitSlice';
import Habit from './Habit';

function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { habits } = useSelector((state) => state.habits);

  useEffect(() => {
    if (user) {
      dispatch(fetchHabits(user._id));
    }
  }, [dispatch, user]);

  return (
    <div>
      <h1>Dashboard</h1>
      {habits.map((habit) => (
        <Habit key={habit._id} habit={habit} />
      ))}
    </div>
  );
}

export default Dashboard;
