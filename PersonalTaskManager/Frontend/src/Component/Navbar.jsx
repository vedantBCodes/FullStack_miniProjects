import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css'; // Optional for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/tasks" className="nav-link">Tasks</NavLink>
      <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
    </nav>
  );
};

export default Navbar;
