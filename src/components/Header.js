import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = ({ username, logout }) => (
  <header className="app-header navbar navbar-expand bg-light mb-3">
    <Link to="/" className="navbar-brand">
      Apollo Boilerplate
    </Link>
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink exact to="/" className="nav-link" activeClassName="active">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/login" className="nav-link" activeClassName="active">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/signup" className="nav-link" activeClassName="active">
          Signup
        </NavLink>
      </li>
    </ul>
    {username && (
      <div className="navbar-text ml-auto">
        {username} | <Link to="/logout">Log out</Link>
      </div>
    )}
  </header>
);

export default Header;
