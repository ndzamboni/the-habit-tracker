import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/habits`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setHabits(response.data);
      } catch (error) {
        console.error('Failed to fetch habits', error);
      }
    };

    fetchHabits();
  }, []);

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <button onClick={logout}>Logout</button>
      <h2>Your Habits</h2>
      <ul>
        {habits.map((habit) => (
          <li key={habit._id}>
            <h3>{habit.name}</h3>
            <p>Category: {habit.category}</p>
            <p>Records:</p>
            <ul>
              {habit.records.map((record, index) => (
                <li key={index}>{new Date(record.date).toLocaleDateString()}: {record.status}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
