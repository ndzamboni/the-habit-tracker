import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartComponent from '../components/ChartComponent';

const Stats = () => {
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
      <h2>Habit Stats</h2>
      <ChartComponent habits={habits} categories={[]} />
    </div>
  );
};

export default Stats;
