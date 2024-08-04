import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const YearInReview = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchYearInReview = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/habits/year-in-review`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const labels = response.data.map(item => item.month);
        const datasets = [
          {
            label: 'Habits Completed',
            data: response.data.map(item => item.count),
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
          },
        ];

        setData({ labels, datasets });
      } catch (error) {
        console.error('Failed to fetch year in review', error);
      }
    };

    fetchYearInReview();
  }, []);

  return (
    <div>
      <h2>Year in Review</h2>
      <Line data={data} />
    </div>
  );
};

export default YearInReview;
