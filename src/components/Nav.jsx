import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import './Nav.css';

const Nav = ({theUser, typeOfUser}) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <Link className="navbar-brand" to="/">REMINDER TOOL</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

            {!theUser
              ? <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link " to="/signup">
                      Sign up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link " to="/login">Login</NavLink>
                  </li>
                </React.Fragment>
              : <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">
                      {theUser}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/newreminder">
                      New Reminder
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/upgrade">Uprade</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/logout">
                      Logout
                    </NavLink>
                  </li>
                </React.Fragment>}

            {typeOfUser === 'admin'
              ? <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/manage">Manage</NavLink>
                  </li>
                </React.Fragment>
              : ''}
          </ul>
          {theUser
            ? <span className="navbar-text">
                Hello, <span className="username">{theUser}</span>
              </span>
            : ''}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
