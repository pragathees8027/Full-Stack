import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/Navbar.css';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" activeclassname="active">Home</NavLink></li>
        <li><NavLink to="/search" activeclassname="active">Search</NavLink></li>
        <li><NavLink to="/library" activeclassname="active">Library</NavLink></li>
        <li><NavLink to="/login" activeclassname="active">Login</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
