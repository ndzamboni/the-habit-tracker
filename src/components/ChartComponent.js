import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = ({ habits }) => {
  const chartRef = useRef();

  const data = {
    labels: habits.map((habit) => habit.name),
    datasets: [
      {
        label: 'Habits',
        data: habits.map((habit) => habit.records.length),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [habits]);

  return <Line ref={chartRef} data={data} />;
};

export default ChartComponent;
