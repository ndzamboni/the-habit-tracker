import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar({ toggleDarkMode }) {
  const { user } = useSelector((state) => state.user);

  return (
    <nav className="nav">
      <div>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </nav>
  );
}

export default Navbar;
