import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabits } from '../features/habit/habitSlice';
import AddHabit from './AddHabit';
import { LineChart, BarChart, PieChart, RadarChart } from './Charts';
import Heatmap from './Heatmap';
import { Container, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from 'axios';

function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { habits } = useSelector((state) => state.habits);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [chartType, setChartType] = useState('line');

  useEffect(() => {
    if (user) {
      dispatch(fetchHabits(user._id));
    }
  }, [dispatch, user]);

  const handleDeleteCategory = async (category) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/habits/category/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchHabits(user._id));
    } catch (error) {
      console.error(error);
    }
  };

  const uniqueCategories = [...new Set(habits.map(habit => habit.category))];

  const chartData = (category) => {
    const categoryHabits = habits.filter(habit => habit.category === category);
    const labels = categoryHabits.map(habit => habit.name);
    const data = categoryHabits.map(habit => habit.logs.reduce((acc, log) => acc + log.duration, 0));

    return {
      labels,
      datasets: [
        {
          label: `${category} Duration`,
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const renderCategorySpecificChart = (category) => {
    switch (chartType) {
      case 'line':
        return <LineChart data={chartData(category)} />;
      case 'heatmap':
        return <Heatmap habits={habits} category={category} />;
      default:
        return <LineChart data={chartData(category)} />;
    }
  };

  const renderComparisonChart = () => {
    const labels = uniqueCategories;
    const data = {
      labels,
      datasets: [
        {
          label: 'Duration by Category',
          data: uniqueCategories.map(category =>
            habits.filter(habit => habit.category === category).reduce((acc, habit) =>
              acc + habit.logs.reduce((accLog, log) => accLog + log.duration, 0), 0)
          ),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    switch (chartType) {
      case 'bar':
        return <BarChart data={data} />;
      case 'pie':
        return <PieChart data={data} />;
      case 'radar':
        return <RadarChart data={data} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <h1>Dashboard</h1>
      <AddHabit />
      <div>
        <Form.Label htmlFor="category-filter">Filter by Category:</Form.Label>
        <Form.Control
          as="select"
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mb-3"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Control>
      </div>
      <DropdownButton id="dropdown-basic-button" title="Select Chart Type" className="mb-3">
        <Dropdown.Item onClick={() => setChartType('line')}>Line Chart</Dropdown.Item>
        <Dropdown.Item onClick={() => setChartType('bar')}>Bar Chart</Dropdown.Item>
        <Dropdown.Item onClick={() => setChartType('pie')}>Pie Chart</Dropdown.Item>
        <Dropdown.Item onClick={() => setChartType('radar')}>Radar Chart</Dropdown.Item>
        <Dropdown.Item onClick={() => setChartType('heatmap')}>Heatmap</Dropdown.Item>
      </DropdownButton>
      {chartType === 'bar' || chartType === 'pie' || chartType === 'radar' ? (
        renderComparisonChart()
      ) : (
        uniqueCategories.map(category => (
          <div key={category}>
            {renderCategorySpecificChart(category)}
          </div>
        ))
      )}
    </Container>
  );
}

export default Dashboard;
