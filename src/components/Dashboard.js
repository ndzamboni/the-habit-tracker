import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabits } from '../features/habit/habitSlice';
import HabitCategoryChart from './HabitCategoryChart';
import AddHabit from './AddHabit';
import BarChart from './BarChart';
import PieChart from './PieChart';
import RadarChart from './RadarChart';
import Heatmap from './Heatmap';
import axios from 'axios';
import { Container, Form, DropdownButton, Dropdown } from 'react-bootstrap';

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

  const renderCategorySpecificChart = (category) => {
    switch (chartType) {
      case 'heatmap':
        return <Heatmap habits={habits} category={category} />;
      default:
        return <HabitCategoryChart category={category} habits={habits.filter(habit => habit.category === category)} />;
    }
  };

  const renderComparisonChart = () => {
    switch (chartType) {
      case 'bar':
        return <BarChart habits={habits} />;
      case 'pie':
        return <PieChart habits={habits} />;
      case 'radar':
        return <RadarChart habits={habits} />;
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
