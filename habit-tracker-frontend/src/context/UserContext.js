// src/context/UserContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user', error);
        }
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
    } catch (error) {
      console.error('Failed to login', error);
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, { username, email, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
    } catch (error) {
      console.error('Failed to register', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
