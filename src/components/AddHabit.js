import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHabits } from '../features/habit/habitSlice';
import { Form, Button, Container } from 'react-bootstrap';

function AddHabit() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const { user } = useSelector((state) => state.user);
  const { habits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedCategory = category === 'new' ? newCategory : category;
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_API_URL}/api/habits`, { name, category: selectedCategory, date, duration }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchHabits(user._id));
      setName('');
      setCategory('');
      setNewCategory('');
      setDate('');
      setDuration('');
    } catch (error) {
      console.error(error);
    }
  };
  

  const uniqueCategories = [...new Set(habits.map(habit => habit.category))];

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formHabitName" className="mb-3">
          <Form.Label>Habit Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter habit name"
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategory" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            <option value="new">Add New Category</option>
          </Form.Control>
          {category === 'new' && (
            <Form.Control
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category"
              required
              className="mt-3"
            />
          )}
        </Form.Group>

        <Form.Group controlId="formDate" className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDuration" className="mb-3">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">Add Habit</Button>
      </Form>
    </Container>
  );
}

export default AddHabit;
