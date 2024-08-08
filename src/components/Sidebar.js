import React from 'react';
import { Offcanvas, Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchHabits } from '../features/habit/habitSlice';

function Sidebar({ show, handleClose, darkMode }) {
  const { habits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  const handleDeleteCategory = async (category) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/habits/category/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchHabits());
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDeleteHabit = async (habitId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/habits/${habitId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchHabits());
    } catch (error) {
      console.error(error);
    }
  };
  

  const uniqueCategories = [...new Set(habits.map(habit => habit.category))];

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" className={darkMode ? 'bg-dark text-white' : ''}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Customize Data</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <h5>Delete Categories</h5>
        <ListGroup className="mb-3">
          {uniqueCategories.map((category) => (
            <ListGroup.Item key={category} className={darkMode ? 'bg-dark text-white' : ''}>
              {category}
              <Button variant="danger" size="sm" className="float-end" onClick={() => handleDeleteCategory(category)}>
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <h5>Delete Habits</h5>
        <ListGroup>
          {habits.map((habit) => (
            <ListGroup.Item key={habit._id} className={darkMode ? 'bg-dark text-white' : ''}>
              {habit.name}
              <Button variant="danger" size="sm" className="float-end" onClick={() => handleDeleteHabit(habit._id)}>
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Sidebar;
