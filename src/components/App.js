import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './features/user/userSlice';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className={`app ${user ? (user.darkMode ? 'dark-mode' : 'light-mode') : 'light-mode'}`}>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/user-profile" component={UserProfile} />
        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    </div>
  );
}

export default App;
