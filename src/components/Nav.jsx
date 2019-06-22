import React, {Component} from 'react';
import {MyContext} from './ReactContext';
import {NavLink, Link} from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
  state = {};

  componentDidMount () {
    // set user to context (checkUser)
    this.context.checkUser ();
  }

  render () {
    return (
      <MyContext.Consumer>
        {context => (
          <React.Fragment>
            <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
              <Link className="navbar-brand" to="/">REMINDER TOOL</Link>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">

                  {!context.state.theUser
                    ? <React.Fragment>
                        <li className="nav-item">
                          <NavLink className="nav-link " to="/signup">
                            Sign up
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link " to="/login">
                            Login
                          </NavLink>
                        </li>
                      </React.Fragment>
                    : <React.Fragment>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/profile">
                            {context.state.theUser}
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/newreminder">
                            New Reminder
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/upgrade">
                            Uprade
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/logout">
                            Logout
                          </NavLink>
                        </li>
                      </React.Fragment>}

                  {context.state.typeOfUser === 'admin'
                    ? <React.Fragment>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/manage">
                            Manage
                          </NavLink>
                        </li>
                      </React.Fragment>
                    : ''}
                </ul>
                {context.state.theUser
                  ? <span className="navbar-text">
                      Hello,
                      {' '}
                      <span className="username">{context.state.theUser}</span>
                    </span>
                  : ''}
              </div>
            </nav>
          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}

Nav.contextType = MyContext;

export default Nav;
