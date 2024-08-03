import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import ChartComponent from './components/ChartComponent';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, lightTheme, darkTheme } from './themes';
import Toggle from './components/Toggle';

const App = () => {
  const [habits, setHabits] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/habits`).then((response) => {
      setHabits(response.data);
    }).catch((error) => {
      console.error("There was an error fetching the habits!", error);
    });
  }, []);

  const addHabit = (habit) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/habits`, habit).then((response) => {
      setHabits([...habits, response.data]);
    }).catch((error) => {
      console.error("There was an error adding the habit!", error);
    });
  };

  const updateHabit = (id, habit) => {
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/habits/${id}`, habit).then((response) => {
      setHabits(
        habits.map((hab) => (hab._id === id ? response.data : hab))
      );
    }).catch((error) => {
      console.error("There was an error updating the habit!", error);
    });
  };

  const deleteHabit = (id) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/habits/${id}`).then(() => {
      setHabits(habits.filter((hab) => hab._id !== id));
    }).catch((error) => {
      console.error("There was an error deleting the habit!", error);
    });
  };

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <Toggle theme={theme} toggleTheme={themeToggler} />
        <div className="App">
          <HabitForm addHabit={addHabit} />
          <HabitList habits={habits} updateHabit={updateHabit} deleteHabit={deleteHabit} />
          <ChartComponent habits={habits} />
        </div>
      </>
    </ThemeProvider>
  );
};

export default App;