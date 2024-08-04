import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { UserProvider, UserContext } from './context/UserContext';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';
import ChartComponent from './components/ChartComponent';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Stats from './pages/Stats';
import YearInReview from './pages/YearInReview';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, lightTheme, darkTheme } from './themes';
import Toggle from './components/Toggle';

const NavBar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/stats">Stats</Link>
          <Link to="/year-in-review">Year In Review</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

const App = () => {
  const [habits, setHabits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/habits`).then((response) => {
      setHabits(response.data);
      const uniqueCategories = [...new Set(response.data.map(habit => habit.category))];
      setCategories(uniqueCategories);
    }).catch((error) => {
      console.error("There was an error fetching the habits!", error);
    });
  }, []);

  const addHabit = (habit) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/habits`, habit).then((response) => {
      setHabits([...habits, response.data]);
      if (!categories.includes(response.data.category)) {
        setCategories([...categories, response.data.category]);
      }
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
    <UserProvider>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <Router>
          <GlobalStyles />
          <Toggle theme={theme} toggleTheme={themeToggler} />
          <NavBar />
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile habits={habits} updateHabit={updateHabit} deleteHabit={deleteHabit} categories={categories} />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/year-in-review" element={<YearInReview />} />
              <Route path="/" element={
                <>
                  <HabitForm addHabit={addHabit} categories={categories} />
                  <HabitList habits={habits} updateHabit={updateHabit} deleteHabit={deleteHabit} categories={categories} />
                  <ChartComponent habits={habits} categories={categories} />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
