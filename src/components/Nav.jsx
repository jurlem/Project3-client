import React, {Component} from 'react';
import {MyContext} from './ReactContext';
import {NavLink, Link} from 'react-router-dom';
import './Nav.css';

class Nav extends Component {
  state = {};

  componentDidMount () {
    // this.context.checkUser ();
  }

  render () {
    const userId = this.context.state.userId
      ? this.context.state.userId
      : localStorage.getItem ('userId');
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
                            Upgrade
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink className="nav-link" to="/logout">
                            Logout
                          </NavLink>
                        </li>
                      </React.Fragment>}

                  {context.state.typeOfUser === 'ADMIN'
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
