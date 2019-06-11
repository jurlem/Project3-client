import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import './Nav.css';

const Nav = ({theUser}) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">REMINDER TOOL</NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/newreminder">
                New Reminder
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/upgrade">Uprade</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/manage">Manage</NavLink>
            </li>
            {!theUser &&
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link " to="/signup">Sign up</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link " to="/login">Login</NavLink>
                </li>
              </React.Fragment>}
            <li className="nav-item">
              <NavLink className="nav-link disabled" to="#">Disabled</NavLink>
            </li>
          </ul>
          <span className="navbar-text">
            Hello, <span className="username">Merle</span>
          </span>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
