import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabits } from '../features/habit/habitSlice';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Habit({ habit }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/habits/${habit._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchHabits(user._id));
    } catch (error) {
      console.error(error);
    }
  };
  

  const data = {
    labels: habit.logs.map(log => new Date(log.date).toLocaleDateString()),
    datasets: [
      {
        label: habit.name,
        data: habit.logs.map(log => log.duration),
        borderColor: habit.color,
        backgroundColor: habit.color,
      },
    ],
  };

  return (
    <div>
      <h2>{habit.name} - {habit.category}</h2>
      <Line data={data} />
      <button onClick={handleDelete}>Delete Habit</button>
    </div>
  );
}

export default Habit;
